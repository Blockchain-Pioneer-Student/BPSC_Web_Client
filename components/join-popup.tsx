import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function JoinPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Main button */}
      <Button
        size="lg"
        variant="outline"
        onClick={() => setOpen(true)}
        className="bg-white text-[#004987] hover:bg-gray-100 transition-all duration-300 hover:scale-105 w-auto self-center"
      >
        <span className="relative z-10 flex items-center gap-2 font-semibold">
          Khám phá BPSC
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Button>

      {/* Popup container */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl border border-blue-400 shadow-[0_0_25px_#00f0ff] animate-fadeIn">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-4 text-gray-400 hover:text-black text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Content */}
            <div className="text-gray-800 space-y-4">
              <h2 className="text-xl font-bold text-blue-700 text-center">
                Chào mừng bạn đến với BPSC
              </h2>
              <p className="text-center">
                Một cộng đồng sinh viên cùng học hỏi, nghiên cứu và xây dựng sản phẩm Blockchain & Web3.
              </p>
              <div className="space-y-1">
                <p>Bạn có thể:</p>
                <ul className="list-decimal pl-5 text-left">
                  <li>Đăng ký tham gia câu lạc bộ</li>
                  <li>Xem các hoạt động sắp tới</li>
                  <li>Kết nối với đội ngũ BPSC</li>
                </ul>
              </div>
              <p className="text-center">
                Chọn một hướng phù hợp hoặc nhắn tin với chúng mình qua{" "}
                <a
                  href="https://www.facebook.com/bpsclub.utc"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Facebook
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
