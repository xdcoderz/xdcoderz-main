const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileSiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
};

type TurnstileVerifyResult =
  | { ok: true; skipped: boolean }
  | { ok: false; message: string };

export function isTurnstileConfigured() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
}

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!secret) {
    return { ok: true, skipped: true };
  }

  if (!token.trim()) {
    return {
      ok: false,
      message: "Complete the verification before submitting.",
    };
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);

  if (remoteIp && remoteIp !== "local") {
    formData.append("remoteip", remoteIp);
  }

  const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Turnstile verification failed with ${response.status}.`);
  }

  const result = (await response.json()) as TurnstileSiteverifyResponse;

  if (result.success) {
    return { ok: true, skipped: false };
  }

  return {
    ok: false,
    message: "Verification failed. Refresh and try once more.",
  };
}
