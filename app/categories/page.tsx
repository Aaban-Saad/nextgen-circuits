import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Footer from '@/components/footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import Header from '@/components/header';


const categoriesData = [
  {
    id: 'microcontrollers',
    title: 'Microcontrollers',
    description: 'Programmable integrated circuits that serve as the brain of electronic projects',
    subcategories: [
      {
        title: 'Arduino',
        description: 'Open-source electronics platform based on easy-to-use hardware and software',
        image: '/assets/images/categories/arduino.jpg'
      },
      {
        title: 'Raspberry Pi',
        description: 'Small single-board computers developed to promote teaching of basic computer science',
        image: '/assets/images/categories/raspberry-pi.jpg'
      },
      {
        title: 'ESP Modules',
        description: 'Wi-Fi and Bluetooth enabled microcontrollers for IoT applications',
        image: '/assets/images/categories/esp.jpg'
      },
      {
        title: 'STM32',
        description: '32-bit flash microcontrollers based on the ARM Cortex-M processor',
        image: '/assets/images/categories/stm32.jpg'
      }
    ]
  },
  {
    id: 'sensors',
    title: 'Sensors',
    description: 'Devices that detect events or changes in the environment and send information to other electronics',
    subcategories: [
      {
        title: 'Temperature Sensors',
        description: 'Measure ambient temperature for environmental monitoring and control systems',
        image: '/assets/images/categories/temperature-sensors.jpg'
      },
      {
        title: 'Motion Sensors',
        description: 'Detect movement in their field of view for security and automation applications',
        image: '/assets/images/categories/motion-sensors.jpg'
      },
      {
        title: 'Ultrasonic Sensors',
        description: 'Use sound waves to measure distance to objects for robotics and automation',
        image: '/assets/images/categories/ultrasonic-sensors.jpg'
      },
      {
        title: 'Gas Sensors',
        description: 'Detect specific gases for safety, environmental monitoring, and industrial applications',
        image: '/assets/images/categories/gas-sensors.jpg'
      }
    ]
  },
  {
    id: 'displays',
    title: 'Displays',
    description: 'Visual output devices for showing information and user interfaces',
    subcategories: [
      {
        title: 'LCD Displays',
        description: 'Liquid Crystal Displays for showing text and simple graphics',
        image: '/assets/images/categories/lcd.jpg'
      },
      {
        title: 'OLED Displays',
        description: 'Organic Light-Emitting Diode displays with high contrast and low power consumption',
        image: '/assets/images/categories/oled.png'
      },
      {
        title: 'TFT Displays',
        description: 'Thin-Film Transistor displays for high-quality color graphics',
        image: '/assets/images/categories/tft.jpg'
      },
      {
        title: 'E-Paper Displays',
        description: 'Electronic paper technology that mimics the appearance of ordinary ink on paper',
        image: '/assets/images/categories/e-paper.png'
      }
    ]
  },
  {
    id: 'components',
    title: 'Components',
    description: 'Basic electronic parts for building and prototyping circuits',
    subcategories: [
      {
        title: 'Resistors',
        description: 'Passive components that implement electrical resistance in electronic circuits',
        image: '/assets/images/categories/resistors.jpg'
      },
      {
        title: 'Capacitors',
        description: 'Store and release electrical energy in electronic circuits',
        image: '/assets/images/categories/capacitors.jpg'
      },
      {
        title: 'Transistors',
        description: 'Semiconductor devices used to amplify or switch electronic signals',
        image: '/assets/images/categories/transistors.jpg'
      },
      {
        title: 'Integrated Circuits',
        description: 'Microchips that contain thousands to millions of electronic components',
        image: '/assets/images/categories/ics.jpg'
      }
    ]
  }
];

export default function CategoriesComponent() {
  return (
    <div className="min-h-screen">
      <ScrollArea className="h-screen">
        <Header />
        <main>
          <div className="min-h-screen bg-background">
            {/* Page Title Section */}

            <div className='bg-linear-to-r from-primary/30 to-accent/30 py-12 mb-12'>
              <div className="container mx-auto px-4 py-4">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center text-secondary">Product Categories</h1>
                <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore our wide range of products across various categories.
                </p>
              </div>
            </div>


            {/* Categories Section */}
            <div className="container mx-auto px-4 py-12">
              <div className="space-y-16">
                {categoriesData.map((category) => (
                  <div key={category.id} id={category.id} className="scroll-mt-20">
                    {/* Category Header */}
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold mb-2 text-center">{category.title}</h2>
                      <p className="text-muted-foreground text-lg text-center">{category.description}</p>
                    </div>

                    {/* Subcategories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {category.subcategories.map((subcategory, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="aspect-video overflow-hidden bg-muted">
                            <Image
                              src={subcategory.image}
                              alt={subcategory.title}
                              width={400}
                              height={225}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardHeader>
                            <CardTitle className="text-xl">{subcategory.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-sm">
                              {subcategory.description}
                            </CardDescription>
                          </CardContent>
                          <CardFooter>
                            <Button variant="default" className="w-full">
                              View Category
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </ScrollArea>
    </div>

  );
}