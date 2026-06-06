import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { NAV_LINKS, SOCIAL, CONTACT } from "@/constants";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h3 className="text-xl font-bold mb-4">ALECOMAN</h3>
            <p className="text-gray-400 text-sm mb-4">
              Taller Industrial especializado en mantenimiento de piladoras, galpones, 
              secadoras de arroz, infraestructura y diseño de piladoras.
            </p>
            <div className="flex gap-3">
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href={SOCIAL.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a href={`mailto:${SOCIAL.gmail}`} className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Mantenimiento de Piladoras</li>
              <li>Construcción de Galpones</li>
              <li>Secadoras de Arroz</li>
              <li>Infraestructura Industrial</li>
              <li>Diseño de Piladoras</li>
              <li>Soldadura Industrial</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                {CONTACT.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                {CONTACT.email}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                {CONTACT.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Alecoman - Taller Industrial. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
