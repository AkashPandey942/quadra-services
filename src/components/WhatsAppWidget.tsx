import Image from "next/image";

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9999,
      }}
    >
      <Image src="/images/whatsapp.svg" width={50} height={50} alt="WhatsApp" />
    </a>
  );
}
