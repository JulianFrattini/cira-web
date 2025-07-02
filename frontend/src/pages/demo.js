import React, { useState, useEffect } from "react";
import Core from "../components/cira-core/Core";

const TIMEOUT_DURATION = 120000;
const POLLING_INTERVAL = 5000;

const Demo = () => {
  const [responsiveCore, setResponsiveCore] = useState(false);
  const [checking, setChecking] = useState(true);
  const [timedOut, setTimedOut] = useState(false);

  const checkHeartbeat = () => {
    fetch(process.env.REACT_APP_CORE_URL + "/api/health", {
      method: "get",
    })
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (res.ok && contentType && contentType.includes("application/json")) {
          const heartbeat = await res.json();
          if (Object.hasOwn(heartbeat, "status")) {
            setResponsiveCore(true);
            setChecking(false);
          } else {
            setResponsiveCore(false);
            setChecking(true);
          }
        } else {
          throw new Error("Response not valid JSON or not OK");
        }
      })
      .catch((error) => {
        console.error("Heartbeat check failed:", error.message);
        setResponsiveCore(false);
        setChecking(true);
      });
  };

  useEffect(() => {
    checkHeartbeat(); // Initial check

    const interval = setInterval(() => {
      if (!responsiveCore) {
        checkHeartbeat();
      }
    }, POLLING_INTERVAL);

    const timeout = setTimeout(() => {
      if (!responsiveCore) {
        setTimedOut(true);
        setChecking(false);
        clearInterval(interval);
      }
    }, TIMEOUT_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [responsiveCore]);

  return (
    <div>
      <h2>Causality Extraction: Demo</h2>
      <p>
        On this page you can explore the automatic, step-wise extraction of
        cause-effect relations from natural language sentences through our
        accessible online demo. The code behind this demonstration is open
        source and publicly available on{" "}
        <a
          href="https://github.com/JulianFrattini/cira"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        . You can also look at some <a href="/examples">examples</a> for
        inspiration.
      </p>

      {responsiveCore && <Core />}

      {!responsiveCore && checking && !timedOut && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ margin: 0, fontWeight: "bold" }}>
            <span
              className="spinner"
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                border: "3px solid rgba(0, 0, 0, 0.2)",
                borderTop: "3px solid #000",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginRight: "0.3rem",
              }}
            />
            We are starting the CiRA Core service. Please wait a few moments...
          </p>
        </div>
      )}

      {!responsiveCore && timedOut && (
        <p style={{ marginTop: "1rem", color: "red", fontWeight: "bold" }}>
          The CiRA Core is currently not available. You can find a self-hostable
          version of the CiRA UI{" "}
          <a
            href="https://github.com/JulianFrattini/cira-ui"
            target="_blank"
            rel="noreferrer"
          >
            on GitHub
          </a>{" "}
          or explore some <a href="/examples">static examples</a>.
        </p>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Demo;