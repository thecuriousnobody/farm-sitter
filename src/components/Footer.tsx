import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-barn-dark text-cream/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐴</span>
              <span className="text-lg font-bold text-wheat-light">
                The Farm Sitter
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Training, credentialing, and connecting professional farm sitters
              nationwide.
            </p>
          </div>

          {/* For Sitters */}
          <div>
            <h3 className="text-wheat font-semibold text-sm uppercase tracking-wide mb-3">
              For Sitters
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/become-a-sitter" className="hover:text-wheat-light transition-colors">
                  Become a Farm Sitter
                </Link>
              </li>
              <li>
                <Link href="/training" className="hover:text-wheat-light transition-colors">
                  Training Academy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-wheat-light transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h3 className="text-wheat font-semibold text-sm uppercase tracking-wide mb-3">
              For Animal Owners
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/find-a-sitter" className="hover:text-wheat-light transition-colors">
                  Find a Sitter
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-wheat-light transition-colors">
                  Free Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-wheat-light transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-wheat-light transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-wheat font-semibold text-sm uppercase tracking-wide mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>www.TheFarmSitter.com</li>
              <li>855-FARMSIT (855-327-6748)</li>
              <li>Peoria, Illinois</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-barn-light/20 mt-8 pt-6 text-center text-xs text-cream/40">
          &copy; 2026 The Farm Sitter Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
