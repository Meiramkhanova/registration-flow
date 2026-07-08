import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../app/AuthLayout";
import { useRegistrationStore } from "../store/registrationStore";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;
const MOCK_CODE = "123456";

export default function Step2Otp() {
  const navigate = useNavigate();
  const phone = useRegistrationStore((s) => s.phone);
  const setOtpVerified = useRegistrationStore((s) => s.setOtpVerified);

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError("");

    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(RESEND_SECONDS);
    setDigits(Array(CODE_LENGTH).fill(""));
    setError("");
    inputsRef.current[0]?.focus();
  };

  const code = digits.join("");
  const isComplete = code.length === CODE_LENGTH;

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (code === MOCK_CODE) {
        setOtpVerified(true);
        navigate("/profile-form");
      } else {
        setError("Неверный код. Попробуйте ещё раз");
        setDigits(Array(CODE_LENGTH).fill(""));
        inputsRef.current[0]?.focus();
      }
    }, 600);
  };

  useEffect(() => {
    if (isComplete && !loading) {
      handleVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete]);

  return (
    <AuthLayout title="Введите код из SMS">
      <p className="text-gray-800 mb-6">
        Проверочный код был отправлен на номер {phone || "+7 (___) ___-__-__"}
      </p>

      <div className="flex gap-2 mb-4">
        {digits.map((d, i) => (
          <input
            key={i}
            // ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-12 h-12 text-center text-lg border rounded-lg outline-none
              ${error ? "border-red-400" : "border-[--color-border-default] focus:border-brand"}`}
          />
        ))}
      </div>

      {error && <p className=" text-red-500 mb-4">{error}</p>}

      <button
        type="button"
        onClick={handleResend}
        disabled={timer > 0}
        className="cursor-pointer text-brand disabled:text-[--color-text-muted] mb-6">
        {timer > 0
          ? `Отправить повторно через ${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`
          : "Отправить код повторно"}
      </button>

      {loading && <p className="text-gray-800">Проверка кода...</p>}
    </AuthLayout>
  );
}
