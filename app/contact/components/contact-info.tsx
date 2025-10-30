import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactInfo() {
  return (
    <Card className="shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-0 bg-white rounded-sm">
      <CardContent className="p-8">
        <h2 className="text-2xl font-semibold text-[#0066cc] mb-6 relative pb-3">
          Get In Touch
          <span className="absolute left-0 bottom-0 w-14 h-[3px] bg-[#00ccff]" />
        </h2>
        <p className="text-[#333] mb-8">
          We’d love to hear from you! Whether you have a question about our
          products, need technical support, or want to place a bulk order, our
          team is ready to assist you.
        </p>

        <div className="space-y-6">
          <ContactItem
            icon={<MapPin className="text-[#00ccff]" size={22} />}
            title="Our Location"
            lines={["123 Electronics Street, Dhaka, Bangladesh"]}
          />
          <ContactItem
            icon={<Phone className="text-[#00ccff]" size={22} />}
            title="Phone Number"
            lines={["+880 1234-567890", "+880 9876-543210"]}
          />
          <ContactItem
            icon={<Mail className="text-[#00ccff]" size={22} />}
            title="Email Address"
            lines={["info@nextgencircuits.com", "support@nextgencircuits.com"]}
          />
          <ContactItem
            icon={<Clock className="text-[#00ccff]" size={22} />}
            title="Business Hours"
            lines={[
              "Mon–Fri: 9:00 AM – 6:00 PM",
              "Sat: 10:00 AM – 4:00 PM",
              "Sun: Closed",
            ]}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function ContactItem({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode
  title: string
  lines: string[]
}) {
  return (
    <div className="flex items-start gap-4 mb-12">
      <div className="pt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-[#004080] mb-1">{title}</h3>
        {lines.map((line, i) => (
          <p key={i} className="text-[#333] mb-2">
            {line}
            <br />
          </p>
        ))}
      </div>
    </div>
  )
}
