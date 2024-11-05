import Link from 'next/link';
import { 
  Users,
  Wallet,
  ArrowLeftRight,
  BarChart2,
  Menu,
  Building2
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-blue-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo y nombre del banco como botón de inicio */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-white cursor-pointer"
          >
            <Building2 size={28} />
            <span className="font-bold text-xl">ChaconsitoBank</span>
          </Link>

          {/* Enlaces de navegación */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/clientes" 
              className="flex items-center space-x-1 text-white hover:text-blue-200 transition duration-150"
            >
              <Users size={20} />
              <span>Clientes</span>
            </Link>

            <Link 
              href="/cuentas" 
              className="flex items-center space-x-1 text-white hover:text-blue-200 transition duration-150"
            >
              <Wallet size={20} />
              <span>Cuentas</span>
            </Link>

            <Link 
              href="/transacciones" 
              className="flex items-center space-x-1 text-white hover:text-blue-200 transition duration-150"
            >
              <ArrowLeftRight size={20} />
              <span>Transacciones</span>
            </Link>

            <Link 
              href="/reportes" 
              className="flex items-center space-x-1 text-white hover:text-blue-200 transition duration-150"
            >
              <BarChart2 size={20} />
              <span>Reportes</span>
            </Link>
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-200 focus:outline-none">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;