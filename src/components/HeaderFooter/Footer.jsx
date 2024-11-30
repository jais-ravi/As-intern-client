import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 section text-gray-300 py-8 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Logo and Description */}
          <div className="mb-6 lg:mb-0">
            <h2 className="text-xl font-bold text-white mb-2">E-Shop</h2>
            <p className="text-gray-400">
              Your one-stop shop for all things fashion. Shop with us for the latest trends.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row lg:space-x-8">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-white font-semibold mb-2">Shop</h3>
              <ul>
                <li>
                  <Link href="/shop/men" className="text-gray-400 hover:text-white">
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="/shop/women" className="text-gray-400 hover:text-white">
                    Women
                  </Link>
                </li>
                <li>
                  <Link href="/shop/kids" className="text-gray-400 hover:text-white">
                    Kids
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-4 sm:mb-0">
              <h3 className="text-white font-semibold mb-2">Company</h3>
              <ul>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Social Media Links */}
        <div className="mt-8 border-t border-gray-700 pt-6 flex justify-between">
          <div className="text-gray-400">
            © {new Date().getFullYear()} E-Shop. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-white">
              Facebook
            </Link>
            <Link href="#" className="hover:text-white">
              Twitter
            </Link>
            <Link href="#" className="hover:text-white">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
