export function Footer() {
    return (
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} NewsAggregator. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-primary">About</a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }