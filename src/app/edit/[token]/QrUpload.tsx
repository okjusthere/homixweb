"use client";

import { useRef, useState } from "react";

/**
 * WeChat QR uploader. Unlike the headshot cropper, a QR must be stored intact
 * (no crop/zoom/re-encode that could corrupt the code), so this is a plain file
 * input the server action reads via formData.get("wechat_qr"). A hidden
 * remove_wechat_qr flag lets an advisor clear an existing QR on save.
 */
export function QrUpload({
  current,
  onChange,
}: {
  current?: string;
  /** Fired with whether a QR is present (existing kept or newly picked). */
  onChange?: (hasQr: boolean) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(current ?? null);
  const [removed, setRemoved] = useState(false);

  const pick = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(file));
    setRemoved(false);
    onChange?.(true);
  };

  const remove = () => {
    if (fileRef.current) fileRef.current.value = "";
    setPreview(null);
    setRemoved(true);
    onChange?.(false);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      {/* remove flag — only submitted when the advisor cleared an existing QR */}
      {removed && <input type="hidden" name="remove_wechat_qr" value="1" />}

      <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-sm border border-line bg-surface">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="WeChat QR" className="h-full w-full object-contain p-2" />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs text-muted">
            No QR yet
            <br />
            暂无二维码
          </div>
        )}
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-line bg-surface px-4 py-5 text-center">
          <p className="text-sm text-ink">
            <label className="cursor-pointer text-bronze underline-offset-4 hover:underline">
              Upload your WeChat QR
              <input
                ref={fileRef}
                type="file"
                name="wechat_qr"
                accept="image/*"
                className="sr-only"
                onChange={(e) => pick(e.target.files?.[0])}
              />
            </label>
          </p>
          <p className="mt-1 text-xs text-muted">
            上传你的微信二维码 · 在微信「我 → 二维码名片」截图保存 · PNG / JPG
          </p>
        </div>
        {preview && (
          <button
            type="button"
            onClick={remove}
            className="text-xs text-muted underline-offset-4 hover:text-bronze hover:underline"
          >
            Remove QR / 移除二维码
          </button>
        )}
      </div>
    </div>
  );
}
