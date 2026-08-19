import type { Metadata } from "next";
import ContactForm from "@/components/ui/contact/ContactForm";
import ContactInfo from "@/components/ui/contact/ContactInfo";
import GoogleMap from "@/components/ui/contact/GoogleMap";

export const metadata: Metadata = {
  title: "تماس با ما | فروشگاه باران",
  description: "با تیم پشتیبانی باران در ارتباط باشید. آدرس، تلفن و ساعات کاری فروشگاه.",
};

export default function ContactPage() {
  return (
    <div className="pb-24 pt-8">
      
      <div className="container mb-12 text-center">
        <h1 className="mb-4 text-3xl font-black text-text md:text-5xl">
          تماس با ما
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-text-secondary">
          خوشحال می‌شویم نظرات، پیشنهادها و سوالات شما را بشنویم.
           تیم پشتیبانی باران همیشه آماده پاسخگویی به شماست.
        </p>
      </div>

      <div className="container grid gap-8 lg:grid-cols-2 lg:gap-12">
        
        
        <div className="space-y-8">
          <ContactInfo />
          
          <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
            <GoogleMap />
          </div>
        </div>

        
        <div className="lg:mt-10">
          <ContactForm />
        </div>

      </div>
    </div>
  );
}