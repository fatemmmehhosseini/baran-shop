

export default function GoogleMap() {
  return (
    <iframe
      className="aspect-[4/2.5] w-full object-cover md:aspect-auto md:h-[450px]"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11854.982145612412!2d51.41882750266565!3d35.76081333527288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e041faf0ee823%3A0xd7926b1a24b8ee77!2sTehran%20Province%2C%20Tehran%2C%20District%203%2C%20Mirdamad%20Blvd%2C%20Iran!5e0!3m2!1sen!2s!4v1777486614265!5m2!1sen!2s"
      style={{ border: 0 }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="موقعیت مکانی فروشگاه باران"
    />
  );
}