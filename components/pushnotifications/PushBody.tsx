import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getFcmToken, onForegroundMessage } from "../../firebase";

export const HeaderBody: React.FC = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-indigo-50 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="inline-flex items-center text-xs font-semibold tracking-wider uppercase text-indigo-600 bg-indigo-50 rounded-full px-3 py-1">
          🔔 Web Push Ready
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
          Receive Firebase Push Notifications
        </h1>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          Click the button below to enable notifications, get your device token,
          and receive messages while this page is open. Background notifications
          appear via your browser’s notification center when this tab is
          inactive.
        </p>
      </div>
    </header>
  );
};

export const PushBody: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission,
  );
  const [token, setToken] = useState<string | null>(null);
  const [lastMsg, setLastMsg] = useState<{
    title?: string;
    body?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const tokenRef = useRef<HTMLTextAreaElement>(null);

  // Register service worker (once)
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .catch((e) => console.error("SW registration failed:", e));
    }
  }, []);

  // Foreground message listener
  useEffect(() => {
    const unsub = onForegroundMessage((payload) => {
      const notification = payload.notification ?? {};
      setLastMsg({ title: notification.title, body: notification.body });

      // Optional: show a quick toast-like browser notification in foreground
      if (Notification.permission === "granted") {
        navigator.serviceWorker.getRegistration().then((reg) => {
          reg?.showNotification(notification.title ?? "New message", {
            body: notification.body,
            icon: "/favicon.ico",
          });
        });
      }
    });
    return () => unsub();
  }, []);

  const handleEnable = useCallback(async () => {
    try {
      setLoading(true);

      // Ask permission
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== "granted") {
        setToken(null);
        return;
      }

      // Get FCM token
      const t = await getFcmToken();
      setToken(t ?? null);
    } catch (e) {
      console.error(e);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCopy = useCallback(() => {
    if (token) {
      navigator.clipboard.writeText(token).catch(() => {
        // fallback
        tokenRef.current?.select();
        document.execCommand("copy");
      });
    }
  }, [token]);

  const canEnable = useMemo(
    () => "Notification" in window && permission !== "granted",
    [permission],
  );

  const showLocalTest = useCallback(async () => {
    if (Notification.permission !== "granted") {
      alert("Please enable notifications first.");
      return;
    }
    const reg = await navigator.serviceWorker.getRegistration();
    reg?.showNotification("Local Test Notification", {
      body: "This is a local test (not from FCM).",
      icon: "/favicon.ico",
    });
  }, []);

  return (
    <section className="px-4">
      <div className="max-w-5xl mx-auto mb-12">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card: Enable / Token */}
          <div className="rounded-2xl shadow-sm border bg-white p-6">
            <h2 className="text-2xl font-bold">Push Notifications</h2>
            <p className="mt-1 text-sm text-slate-600">
              Status:{" "}
              <span
                className={
                  permission === "granted"
                    ? "text-green-600 font-semibold"
                    : permission === "denied"
                      ? "text-red-600 font-semibold"
                      : "text-amber-600 font-semibold"
                }
              >
                {permission}
              </span>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleEnable}
                disabled={!canEnable || loading}
                className={`px-4 py-2 rounded-xl text-white text-sm font-semibold transition ${
                  canEnable && !loading
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-slate-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Enabling..." : "Enable Notifications"}
              </button>

              <button
                onClick={showLocalTest}
                className="px-4 py-2 rounded-xl border text-sm font-semibold hover:bg-slate-50"
              >
                Test Local Notification
              </button>
            </div>

            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-700">
                Device Token (send your FCM to this):
              </label>
              <textarea
                ref={tokenRef}
                readOnly
                value={token ?? ""}
                rows={5}
                className="mt-2 w-full rounded-xl border bg-slate-50 p-3 text-xs"
                placeholder="No token yet. Click 'Enable Notifications'."
              />
              <div className="mt-2 flex gap-3">
                <button
                  onClick={handleCopy}
                  disabled={!token}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold ${
                    token
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-slate-300 text-slate-600"
                  }`}
                >
                  Copy Token
                </button>
                <a
                  href="https://firebase.google.com/docs/cloud-messaging/js/send-multiple"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl border text-sm font-semibold hover:bg-slate-50"
                >
                  How to send a test via FCM
                </a>
              </div>
            </div>
          </div>

          {/* Card: Last Message */}
          <div className="rounded-2xl shadow-sm border bg-white p-6">
            <h3 className="text-xl font-bold">Last Foreground Message</h3>
            {lastMsg ? (
              <div className="mt-4 space-y-1">
                <p className="text-sm">
                  <span className="font-semibold">Title:</span>{" "}
                  {lastMsg.title ?? "—"}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Body:</span>{" "}
                  {lastMsg.body ?? "—"}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Tip: background messages appear as system notifications when
                  the tab is hidden or the browser is in the background.
                </p>
              </div>
            ) : (
              <p className="mt-4 text-slate-600">No message received yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const FooterBody: React.FC = () => {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        <p className="text-sm text-slate-500">
          Built with ❤️ • Firebase Cloud Messaging + React + TypeScript
        </p>
      </div>
    </footer>
  );
};

// export default { HeaderBody, PushBody, FooterBody };
