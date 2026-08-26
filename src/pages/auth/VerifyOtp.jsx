import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Mail, Loader } from "lucide-react";
import { verifyOtp, resendOtp } from "../../api/authApi";

const RESEND_COOLDOWN_SECONDS = 30;

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [digits, setDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  // If someone lands here directly without registering first, send them back.
  if (!email) {
    return <Navigate to="/register" replace />;
  }

  const handleChange = (index, value) => {
    // only allow a single digit
    const digit = value.replace(/\D/g, "").slice(-1);

    const next = [...digits];
    next[index] = digit;
    setDigits(next);

    if (digit && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (!pasted) return;

    const next = ["", "", "", ""];
    pasted.split("").forEach((d, i) => (next[i] = d));
    setDigits(next);
    inputRefs[Math.min(pasted.length, 3)].current?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = digits.join("");

    if (otp.length !== 4) {
      return alert("Please enter the 4-digit code");
    }

    setLoading(true);
    try {
      const res = await verifyOtp({ email, otp });
      alert(res.data.message);
      navigate("/user/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
      setDigits(["", "", "", ""]);
      inputRefs[0].current?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    setResending(true);
    try {
      const res = await resendOtp(email);
      alert(res.data.message);
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setDigits(["", "", "", ""]);
      inputRefs[0].current?.focus();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-6 bg-[#F6F3EC] animate-fadeIn">
      <div className="w-full max-w-md bg-[#FCFBF8] rounded-3xl p-8 shadow-xl shadow-[#1C2321]/5">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 bg-[#7A2F2F]/10 rounded-xl flex items-center justify-center">
            <div className="w-3 h-3 bg-[#7A2F2F] rounded-full" />
          </div>
          <span className="font-poppins font-bold text-lg text-[#1C2321]">
            BloodLink
          </span>
        </div>

        <div className="w-14 h-14 bg-[#7A2F2F]/10 rounded-2xl flex items-center justify-center mt-4 mb-3">
          <Mail className="w-6 h-6 text-[#7A2F2F]" />
        </div>

        <h1 className="font-poppins font-bold text-2xl text-[#1C2321] mb-1">
          Verify your email
        </h1>
        <p className="text-sm text-[#5a554a] mb-6">
          We sent a 4-digit code to{" "}
          <span className="font-medium text-[#1C2321]">{email}</span>. Enter it
          below to verify your account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-bold rounded-xl border border-[#8C8579]/20 bg-white text-[#1C2321] focus:outline-none focus:ring-2 focus:ring-[#7A2F2F] focus:border-transparent transition-all duration-200"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl font-semibold text-sm bg-[#7A2F2F] text-white hover:bg-[#631f1f] shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify & Continue"
            )}
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-sm text-[#8C8579]">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || resending}
              className="font-medium text-[#7A2F2F] hover:text-[#631f1f] disabled:text-[#8C8579] disabled:cursor-not-allowed transition-colors"
            >
              {resending
                ? "Sending..."
                : cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : "Resend OTP"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
