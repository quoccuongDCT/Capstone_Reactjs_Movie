import { Tv, Video, Download } from "lucide-react"

export default function ServicesSection() {
  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Promotional Card */}
          <div className="relative">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <div className="bg-white rounded-lg p-8 relative">
                {/* Price Tag */}
                <div className="absolute top-4 right-4 text-sm font-semibold">Only $3.99</div>

                {/* Illustration */}
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="mb-8">
                    <div className="relative w-48 h-48">
                      {/* Glasses */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2">
                        <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
                          <circle cx="25" cy="20" r="18" stroke="#FCD34D" strokeWidth="4" fill="none" />
                          <circle cx="95" cy="20" r="18" stroke="#FCD34D" strokeWidth="4" fill="none" />
                          <line x1="43" y1="20" x2="77" y2="20" stroke="#FCD34D" strokeWidth="4" />
                          <line x1="7" y1="20" x2="0" y2="15" stroke="#1e293b" strokeWidth="3" />
                          <line x1="113" y1="20" x2="120" y2="15" stroke="#1e293b" strokeWidth="3" />
                        </svg>
                      </div>
                      {/* Nose */}
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-12 h-12 bg-red-500 rounded-full" />
                      {/* Mustache */}
                      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-32 h-16 bg-slate-900 rounded-t-full" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-center space-y-2">
                    <div
                      className="text-6xl font-bold text-slate-900"
                      style={{ WebkitTextStroke: "2px currentColor", WebkitTextFillColor: "transparent" }}
                    >
                      HD 4K
                    </div>
                    <div className="text-4xl font-bold text-slate-900">Resolution!</div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2">
                  <div className="bg-yellow-400 px-4 py-16 rounded-lg flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <Download className="w-6 h-6 text-slate-900" />
                      <div className="text-slate-900 font-bold text-sm [writing-mode:vertical-lr] rotate-180">
                        DOWNLOAD
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Services Content */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-yellow-400" />
                <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">OUR SERVICES</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Download Your Shows Watch Offline.
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elsedo eiusmod tempor. There are many variations of
                passages of lorem ipsum available, but the majority have suffered alteration in some injected humour.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-yellow-400 flex items-center justify-center">
                    <Tv className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Enjoy on Your TV.</h3>
                  <p className="text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-yellow-400 flex items-center justify-center">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Watch Everywhere.</h3>
                  <p className="text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
