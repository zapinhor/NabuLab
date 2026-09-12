function safeAvatarUrl(value: string | null) {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export default function StudentAvatar({
  name,
  avatarUrl,
  size = "md",
}: {
  name: string;
  avatarUrl: string | null;
  size?: "md" | "lg";
}) {
  const imageUrl = safeAvatarUrl(avatarUrl);
  const initial = name.trim().charAt(0).toLocaleUpperCase("pt-BR") || "U";
  const sizeClass = size === "lg" ? "h-20 w-20 text-2xl" : "h-10 w-10 text-sm";

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#174EA6] bg-cover bg-center font-bold text-white shadow-sm ${sizeClass}`}
      style={
        imageUrl
          ? { backgroundImage: `url(${JSON.stringify(imageUrl)})` }
          : undefined
      }
    >
      {!imageUrl && initial}
    </span>
  );
}
