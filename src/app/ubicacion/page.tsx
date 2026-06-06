import { MapPin, Phone, Mail } from "lucide-react";
import { CONTACT } from "@/constants";

export default function UbicacionPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-[#0F172A] to-[#1E3A5F] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Ubicación</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Encuéntranos en Cuenca, Ecuador
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="bg-gray-200 rounded-2xl overflow-hidden h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5!2d-79.0!3d-2.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwNTQnMDAuMCJTIDc5wrAwMCcwMC4wIl0!5e0!3m2!1ses!2sec!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">Nuestra Ubicación</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-[#1E3A5F]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E3A5F]">Dirección</h3>
                    <p className="text-gray-600">{CONTACT.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-[#1E3A5F]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E3A5F]">Teléfono</h3>
                    <p className="text-gray-600">{CONTACT.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-[#1E3A5F]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E3A5F]">Correo Electrónico</h3>
                    <p className="text-gray-600">{CONTACT.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-[#1E3A5F] mb-2">Horario de Atención</h3>
                <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Sábados: 8:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
