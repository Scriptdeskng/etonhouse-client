import Entrance from "@/animated/Entrance";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SEO from "@/components/seo";

const sections = [
  {
    title: "Products & Product Representation",
    bullets: [
      "We make every effort to ensure that product descriptions, specifications, images, dimensions and prices displayed on our website are accurate.",
      "Product images are for illustrative purposes. Minor variations in colour, texture, grain, finishing and appearance may occur due to lighting, photography, screen settings and the natural characteristics of materials.",
      "Some products may be available in different fabric, colour, material or finishing options, subject to availability.",
      "Eton House reserves the right to update product descriptions, specifications, collections and prices where necessary.",
    ],
  },
  {
    title: "Pricing & Payment",
    bullets: [
      "All prices displayed on our website are in Nigerian Naira (₦), unless otherwise stated.",
      "Prices are subject to change without prior notice. However, the price confirmed at the point of a completed purchase will apply to that order.",
      "Orders are considered confirmed only upon receipt and verification of the required payment.",
      "Full payment is required before delivery unless an alternative payment arrangement has been expressly approved by Eton House in writing.",
      "Where instalment or deposit arrangements are approved, the agreed payment schedule must be honoured before the product is released or delivered.",
      "Applicable delivery, installation or additional service charges will be communicated separately where they are not included in the displayed product price.",
    ],
  },
  {
    title: "Order Confirmation & Processing",
    bullets: [
      "Customers are responsible for ensuring that all order details, including product selection, quantity, dimensions, colours, finishes and delivery information, are correct before completing payment.",
      "Once an order has been confirmed and payment received, any request for changes will be subject to approval and may attract additional costs or adjustments to the delivery timeline.",
      "Eton House reserves the right to decline or cancel an order in exceptional circumstances, including pricing errors, product unavailability or circumstances beyond reasonable control. Where payment has already been received, the customer will be notified and an appropriate refund or alternative arrangement offered.",
    ],
  },
  {
    title: "Custom-Made & Personalized Orders",
    bullets: [
      "Custom furniture and personalised orders are produced according to specifications agreed upon with the customer.",
      "Customers are responsible for approving all relevant design details, measurements, materials, finishes and other specifications before production begins.",
      "Once production has commenced, alterations, cancellations or changes to approved specifications may not be accepted or may attract additional charges.",
      "Custom-made and personalised products are generally non-returnable and non-refundable, except where a verified manufacturing defect or other qualifying issue exists under our applicable warranty and returns policies.",
    ],
  },
  {
    title: "Production & Delivery Timelines",
    bullets: [
      "Estimated production and delivery timelines will be communicated at the point of order confirmation.",
      "Delivery timelines may vary depending on product availability, customisation requirements, production schedules, logistics and other operational considerations.",
      "Eton House will make reasonable efforts to meet communicated timelines and will notify customers of significant delays where possible.",
      "Delivery arrangements, charges and applicable service conditions will be communicated before dispatch.",
      "Customers are responsible for providing accurate delivery addresses and ensuring that the intended delivery location is accessible and suitable for the furniture being delivered.",
      "Additional charges may apply where delivery requires special handling, restricted access arrangements, additional labour or multiple delivery attempts due to circumstances attributable to the customer.",
    ],
  },
  {
    title: "Delivery, Inspection & Acceptance",
    bullets: [
      "Customers or their authorised representatives are expected to inspect delivered products upon receipt.",
      "Any visible damage, missing items, incorrect products or delivery discrepancies should be reported to Eton House within 48 hours of delivery, accompanied by clear photographic or video evidence where applicable.",
      "Signing or acknowledging delivery confirms receipt of the items, but does not waive any valid rights relating to latent manufacturing defects covered by our warranty.",
      "Eton House will assess reported issues and determine the appropriate resolution in line with its warranty and returns policies.",
    ],
  },
  {
    title: "Returns, Refunds & Exchanges",
    intro: "Our returns and refunds policy is designed to ensure fairness and transparency for both customers and Eton House.",
    bullets: [
      "Eligible standard products may be considered for return within 30 days of delivery, provided they are unused, undamaged and returned in their original packaging with proof of purchase.",
      "Custom-made, personalised, specially commissioned or made-to-order products are not eligible for return or refund solely because of a change of preference, except where a qualifying defect or other applicable legal right exists.",
      "Products reported to have manufacturing defects or damage on arrival will be assessed for repair, replacement or refund, as appropriate.",
      "All returns are subject to inspection and approval by Eton House.",
      "Approved refunds will be processed to the original payment method within 1–7 business days, subject to payment provider processing times.",
      "Return transportation and handling costs may be borne by the customer unless the return arises from a verified Eton House error or qualifying product defect.",
    ],
    outro: "For complete details, please refer to our separate Refunds & Returns Policy.",
  },
  {
    title: "Warranty & Product Care",
    intro: "Eton House products are crafted with attention to quality, durability and finish.",
    bullets: [
      "Applicable products are covered by the warranty specified in the relevant warranty documentation.",
      "Warranty coverage may differ according to product type, materials, construction and purchase category.",
      "Structural components and upholstery or finishes may carry different warranty periods.",
      "Warranty protection applies to qualifying manufacturing defects under normal residential use and appropriate care.",
      "Damage arising from misuse, negligence, accidents, excessive moisture, harsh chemicals, unauthorised modifications, improper handling or failure to follow recommended care instructions is excluded.",
      "Customers are encouraged to follow the care and maintenance guidelines supplied with their purchases.",
    ],
    outro: "Please consult the applicable Eton House Warranty Policy for full coverage details and exclusions.",
  },
  {
    title: "Promotions, Discounts & Rewards",
    bullets: [
      "Promotional offers, discounts, seasonal sales and reward programmes are subject to their individual terms and validity periods.",
      "Offers cannot be combined unless expressly stated by Eton House.",
      "Discounts and promotional prices apply only within the specified promotional period and to qualifying products.",
      "ETON REWARDS or other applicable loyalty benefits are governed by their respective programme rules.",
      "Reward credits, where applicable, are subject to the qualifying purchase amount, redemption conditions and validity period communicated by Eton House.",
      "Unless expressly stated otherwise, promotional rewards and credits are not redeemable for cash or transferable to another customer.",
    ],
  },
  {
    title: "Customer Responsibilities",
    intro: "By making a purchase, customers agree to:",
    bullets: [
      "Provide accurate personal, contact and delivery information.",
      "Verify product specifications and measurements before confirming an order.",
      "Ensure that the intended delivery space can accommodate the purchased furniture.",
      "Make timely payments in accordance with agreed payment terms.",
      "Follow recommended product care and maintenance instructions.",
      "Communicate any order-related concerns through Eton House's official contact channels.",
    ],
  },
  {
    title: "Privacy & Customer Information",
    bullets: [
      "Eton House respects the privacy of its customers.",
      "Personal information provided during purchases, enquiries or account registration will be handled in accordance with our Privacy Policy and applicable data protection laws in Nigeria.",
      "Customer information may be used for order processing, payment verification, delivery coordination, customer support and other legitimate business purposes.",
    ],
  },
  {
    title: "Limitation of Liability",
    bullets: [
      "Eton House shall take reasonable steps to ensure that products and services meet the standards communicated to customers.",
      "To the extent permitted by applicable law, Eton House shall not be responsible for indirect or consequential losses arising from circumstances beyond its reasonable control, including delays caused by logistics providers, unforeseen production interruptions or events outside its control.",
      "Nothing in these Terms & Conditions shall exclude or limit any consumer rights or liabilities that cannot lawfully be excluded or limited under applicable Nigerian law.",
    ],
  },
  {
    title: "Changes to These Terms",
    bullets: [
      "Eton House reserves the right to amend or update these Terms & Conditions when necessary.",
      "Updated terms will be published on our website, with the effective date indicated accordingly. The terms applicable to a purchase will ordinarily be those accepted at the time the order is placed, subject to applicable law.",
    ],
  },
  {
    title: "Governing Law",
    bullets: [
      "These Terms & Conditions shall be governed by and interpreted in accordance with the laws of the Federal Republic of Nigeria.",
      "Any disputes arising from purchases or transactions with Eton House shall be addressed through good-faith discussions, and where necessary, through the appropriate legal channels in Nigeria.",
    ],
  },
];

const TermsAndConditionsPage = () => {
  return (
    <Entrance>
      <SEO
        title="Terms & Conditions"
        description="Read the Eton House Terms & Conditions for purchases, delivery, returns, warranties and customer responsibilities."
        canonicalPath="/terms-and-conditions"
      />
      <Navbar />

      <main className="bg-[#f7f7f7] px-5 py-12 md:py-20 xl:px-20">
        <article className="mx-auto max-w-[980px] bg-white px-6 py-10 shadow-sm md:px-14 md:py-16">
          <header className="border-b border-[#d6ddd6] pb-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#616161]">
              Eton House
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-[#141414] md:text-6xl">
              Terms & Conditions
            </h1>
            <p className="mt-5 text-sm text-[#616161] md:text-base">
              Effective Date: November 2026
            </p>
            <p className="mt-8 max-w-3xl text-base leading-7 text-[#333333] md:text-lg md:leading-8">
              Welcome to Eton House. These Terms & Conditions govern all purchases,
              orders and transactions made through “www.etonhouseng.com”, our
              showroom, or any other authorized Eton House sales channel.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#333333] md:text-lg md:leading-8">
              By placing an order or proceeding with a purchase, you acknowledge
              that you have read, understood and agreed to the terms outlined below.
            </p>
          </header>

          <div className="divide-y divide-[#e5e5e5]">
            {sections.map((section, index) => (
              <section key={section.title} className="py-8 first:pt-10 md:py-10">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#8d8d8d]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="text-2xl font-bold text-[#141414] md:text-3xl">
                  {section.title}
                </h2>
                {section.intro && (
                  <p className="mt-5 text-base leading-7 text-[#333333]">
                    {section.intro}
                  </p>
                )}
                <ul className="mt-5 space-y-3 pl-5 text-base leading-7 text-[#333333] marker:text-[#8d8d8d]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="pl-2">
                      {bullet}
                    </li>
                  ))}
                </ul>
                {section.outro && (
                  <p className="mt-5 text-base leading-7 text-[#333333]">
                    {section.outro}
                  </p>
                )}
              </section>
            ))}
          </div>

          <section className="border-t-4 border-[#d6ddd6] pt-10">
            <h2 className="text-2xl font-bold text-[#141414] md:text-3xl">
              Contact & Customer Support
            </h2>
            <div className="mt-5 space-y-2 text-base leading-7 text-[#333333]">
              <p className="font-bold">ETON HOUSE</p>
              <p>59A Mainland Way, Dolphin Estate, Ikoyi, Lagos, Nigeria.</p>
              <p>Website: www.etonhouseng.com</p>
              <p>Email: customer@etonhouseng.com</p>
              <p>Phone/WhatsApp: +234 809 039 7777</p>
            </div>
          </section>

          <section className="mt-12 bg-[#d6ddd6] px-6 py-8 md:px-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#616161]">
              Customer Acknowledgement
            </p>
            <p className="text-base leading-7 text-[#141414]">
              By ticking the acceptance box and proceeding with checkout, you confirm that:
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-7 text-[#141414]">
              <li>You have read and understood these Terms & Conditions.</li>
              <li>You agree to the applicable payment, production, delivery, returns and warranty conditions.</li>
              <li>You have reviewed your order details and accept responsibility for the accuracy of the information supplied.</li>
            </ol>
            <p className="mt-6 text-base leading-7 text-[#141414]">
              Thank you for choosing Eton House. We appreciate your trust in us and
              look forward to making your spaces exceptional.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </Entrance>
  );
};

export default TermsAndConditionsPage;
