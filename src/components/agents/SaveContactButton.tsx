"use client";

/**
 * Downloads an agent's contact card as a .vcf (vCard). The card text is built
 * on the server and passed in, so this component stays a tiny client shim that
 * only handles the Blob download — one tap adds the advisor to a phone's
 * contacts, which converts far better than asking a client to type a number.
 */
export function SaveContactButton({
  vcard,
  filename,
  label,
  className,
}: {
  vcard: string;
  filename: string;
  label: string;
  className?: string;
}) {
  const download = () => {
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" onClick={download} className={className}>
      {label}
    </button>
  );
}
