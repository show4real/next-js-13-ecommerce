"use client";
const callouts = [
  {
    name: "Fast and Easy",
    description: "Nationwide Delivery",
    imageSrc: "../../public/assets/support-5.png",
  },
  {
    name: "Seamless Payment",
    description: "pay on delivery",
  },
  {
    name: "Our Offices",
    description: "You get what you order 100%",
  },
];

export default function FeaturedServices() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-5 sm:py-24 lg:max-w-none lg:py-20">
          {/* <h2 className="text-2xl font-bold text-gray-900">Collections</h2> */}

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-40/Users/showoleoladayo/Desktop/frontenddev/flones/public/assets/img/icon-img/support-5.png /Users/showoleoladayo/Desktop/frontenddev/flones/public/assets/img/icon-img/support-6.png /Users/showoleoladayo/Desktop/frontenddev/flones/public/assets/img/icon-img/support-7.png w-full overflow-hidden rounded-lg bg-white ">
                  <h3 className="mt-6 text-sm text-gray-500 text-center">
                    <a href={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900 text-center uppercase">
                    {callout.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
