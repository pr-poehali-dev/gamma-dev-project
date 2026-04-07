import { Heart, ShieldCheck, Sparkles, Search, Plus, Minus, Mail, MapPin, Venus, Mars } from "lucide-react"
import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface FAQ {
  question: string
  answer: string
}

interface Cat {
  id: number
  name: string
  age: string
  ageGroup: "kitten" | "young" | "adult"
  gender: "male" | "female"
  city: string
  trait: string
  color: string
  photo: string
}

const CATS: Cat[] = [
  {
    id: 1,
    name: "Рыжик",
    age: "3 года",
    ageGroup: "adult",
    gender: "male",
    city: "Москва",
    trait: "Ласковый и спокойный",
    color: "Рыжий",
    photo: "https://cdn.poehali.dev/projects/cc3847d3-ee93-4e35-81dc-021d51796bec/files/2cf9198b-1dd3-4709-a8dc-6b78140fad4c.jpg",
  },
  {
    id: 2,
    name: "Пепел",
    age: "4 месяца",
    ageGroup: "kitten",
    gender: "male",
    city: "Санкт-Петербург",
    trait: "Игривый и любопытный",
    color: "Серый",
    photo: "https://cdn.poehali.dev/projects/cc3847d3-ee93-4e35-81dc-021d51796bec/files/2046d772-cfdd-4528-a47d-ba581e439e7d.jpg",
  },
  {
    id: 3,
    name: "Феликс",
    age: "2 года",
    ageGroup: "young",
    gender: "male",
    city: "Москва",
    trait: "Независимый и умный",
    color: "Чёрно-белый",
    photo: "https://cdn.poehali.dev/projects/cc3847d3-ee93-4e35-81dc-021d51796bec/files/534dc797-e064-411c-bc93-5e8e52001296.jpg",
  },
  {
    id: 4,
    name: "Снежка",
    age: "5 лет",
    ageGroup: "adult",
    gender: "female",
    city: "Казань",
    trait: "Нежная и тихая",
    color: "Белая",
    photo: "https://cdn.poehali.dev/projects/cc3847d3-ee93-4e35-81dc-021d51796bec/files/9b46797a-129e-4599-b56e-6b51497a4402.jpg",
  },
  {
    id: 5,
    name: "Персик",
    age: "1 год",
    ageGroup: "young",
    gender: "female",
    city: "Екатеринбург",
    trait: "Активная и весёлая",
    color: "Рыжая с белым",
    photo: "https://cdn.poehali.dev/projects/cc3847d3-ee93-4e35-81dc-021d51796bec/files/f1610d96-692f-4c8c-aeec-d4a55c2f1d6d.jpg",
  },
  {
    id: 6,
    name: "Тигра",
    age: "3 месяца",
    ageGroup: "kitten",
    gender: "female",
    city: "Новосибирск",
    trait: "Озорная и смелая",
    color: "Полосатая",
    photo: "https://cdn.poehali.dev/projects/cc3847d3-ee93-4e35-81dc-021d51796bec/files/7c149832-9c72-4afe-bd91-c88f90d0ef41.jpg",
  },
]

const CITIES = ["Все города", "Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Новосибирск"]

const faqs: FAQ[] = [
  {
    question: "Как проходит процесс усыновления?",
    answer:
      "Всё просто: вы находите котика на платформе, оставляете заявку и связываетесь с приютом. Волонтёры расскажут о характере питомца, ответят на вопросы и организуют знакомство. После небольшой анкеты и договора — котик едет домой к вам!",
  },
  {
    question: "Все ли котики здоровы?",
    answer:
      "Каждый котик в нашей базе прошёл ветеринарный осмотр, привит и обработан от паразитов. Приюты-партнёры несут ответственность за состояние здоровья животных и указывают все детали в карточке питомца.",
  },
  {
    question: "Можно ли вернуть котика?",
    answer:
      "Мы понимаем, что иногда обстоятельства меняются. В течение 2 недель котика можно вернуть в приют без объяснения причин. Главное — чтобы питомцу было хорошо, поэтому мы всегда готовы помочь найти решение.",
  },
  {
    question: "Как добавить котика от нашего приюта на платформу?",
    answer:
      "Если вы представляете приют или занимаетесь волонтёрской деятельностью — свяжитесь с нами через форму. Мы бесплатно разместим ваших подопечных на платформе и поможем быстрее найти им дом.",
  },
]

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [filterAge, setFilterAge] = useState<string>("all")
  const [filterGender, setFilterGender] = useState<string>("all")
  const [filterCity, setFilterCity] = useState<string>("Все города")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const filteredCats = CATS.filter((cat) => {
    const ageOk = filterAge === "all" || cat.ageGroup === filterAge
    const genderOk = filterGender === "all" || cat.gender === filterGender
    const cityOk = filterCity === "Все города" || cat.city === filterCity
    return ageOk && genderOk && cityOk
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("loading")
    try {
      const res = await fetch("https://functions.poehali.dev/f7fbff8a-195a-4b9f-93fc-b48e8d6ed25f", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setFormStatus("error")
      }
    } catch {
      setFormStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F12] text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(https://cdn.poehali.dev/projects/cc3847d3-ee93-4e35-81dc-021d51796bec/files/5210ac30-925c-4e1f-8245-59db48224096.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/85" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full">
            <Icon name="Cat" className="w-5 h-5" />
            <span className="font-medium">КотоДом</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {["Котики", "Как это работает", "Приюты", "Вопросы", "Контакты"].map((item) => (
              <a key={item} href="#" className="px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full hover:bg-black/50 transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full hover:bg-black/50 transition-colors">Войти</a>
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">Найти котика</Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
          <div className="mb-6 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full">
            <span className="text-sm font-medium">Более 500 котиков ждут своего дома</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-balance">Найди своего котика.</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mb-12 leading-relaxed text-pretty">
            Онлайн-платформа для поиска котиков из приютов по всей России. Каждый питомец мечтает о тёплом доме и любящей семье.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-4 text-lg">
              Смотреть котиков
            </Button>
            <Button size="lg" variant="outline" className="bg-black/40 ring-1 ring-white/20 backdrop-blur border-0 text-white hover:bg-black/50 rounded-full px-8 py-4 text-lg">
              Как усыновить?
            </Button>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-black/40 ring-1 ring-white/20 backdrop-blur rounded-full">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Все котики проверены и привиты</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="rounded-2xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 ring-1 ring-white/20 mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Удобный поиск</h3>
              <p className="text-white/80 leading-relaxed">Фильтруй по возрасту, окрасу, характеру и городу.</p>
            </div>
            <div className="rounded-2xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 ring-1 ring-white/20 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Проверенные приюты</h3>
              <p className="text-white/80 leading-relaxed">Работаем только с официальными и волонтёрскими приютами.</p>
            </div>
            <div className="rounded-2xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 ring-1 ring-white/20 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Здоровые питомцы</h3>
              <p className="text-white/80 leading-relaxed">Каждый котик привит и прошёл ветеринарный осмотр.</p>
            </div>
            <div className="rounded-2xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 ring-1 ring-white/20 mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Бесплатная платформа</h3>
              <p className="text-white/80 leading-relaxed">Поиск и усыновление — без скрытых платежей и комиссий.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-12">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Котики ждут тебя</h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">Познакомься с нашими пушистыми подопечными и выбери своего.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-10">
              <div className="flex items-center gap-1 bg-black/30 ring-1 ring-white/10 rounded-full p-1">
                {[
                  { value: "all", label: "Любой возраст" },
                  { value: "kitten", label: "Котята" },
                  { value: "young", label: "Молодые" },
                  { value: "adult", label: "Взрослые" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilterAge(opt.value)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${filterAge === opt.value ? "bg-white text-black font-medium" : "text-white/70 hover:text-white"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 bg-black/30 ring-1 ring-white/10 rounded-full p-1">
                {[
                  { value: "all", label: "Все", icon: null },
                  { value: "male", label: "Коты", icon: <Mars className="w-3.5 h-3.5" /> },
                  { value: "female", label: "Кошки", icon: <Venus className="w-3.5 h-3.5" /> },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilterGender(opt.value)}
                    className={`px-4 py-2 rounded-full text-sm flex items-center gap-1.5 transition-all ${filterGender === opt.value ? "bg-white text-black font-medium" : "text-white/70 hover:text-white"}`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 bg-black/30 ring-1 ring-white/10 rounded-full p-1 flex-wrap">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => setFilterCity(city)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap flex items-center gap-1.5 transition-all ${filterCity === city ? "bg-white text-black font-medium" : "text-white/70 hover:text-white"}`}
                  >
                    {city !== "Все города" && <MapPin className="w-3 h-3" />}
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Cat Cards */}
            {filteredCats.length === 0 ? (
              <div className="text-center py-16 text-white/50">
                <p className="text-2xl mb-2">Котики не найдены</p>
                <p className="text-sm">Попробуй изменить фильтры</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCats.map((cat) => (
                  <div key={cat.id} className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur overflow-hidden group hover:ring-white/25 transition-all duration-300">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={cat.photo}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-black/50 backdrop-blur rounded-full text-xs">
                        {cat.gender === "male" ? <Mars className="w-3 h-3" /> : <Venus className="w-3 h-3" />}
                        {cat.gender === "male" ? "Кот" : "Кошка"}
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-white/80">
                        <MapPin className="w-3 h-3" />
                        {cat.city}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">{cat.name}</h3>
                        <span className="text-white/50 text-sm">{cat.age}</span>
                      </div>
                      <p className="text-white/70 text-sm mb-1">{cat.color}</p>
                      <p className="text-white/80 text-sm mb-5">{cat.trait}</p>
                      <Button className="w-full bg-white text-black hover:bg-white/90 rounded-xl text-sm font-medium">
                        Познакомиться
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Путь котика домой</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">Четыре простых шага — и в твоём доме появится новый пушистый друг.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                { n: "01.", title: "Выбираешь", text: "Просматриваешь анкеты котиков с фото, описанием характера и информацией о здоровье." },
                { n: "02.", title: "Знакомишься", text: "Связываешься с приютом, задаёшь вопросы и договариваешься о встрече с питомцем." },
                { n: "03.", title: "Оформляешь", text: "Заполняешь небольшую анкету и подписываешь договор об ответственном усыновлении." },
                { n: "04.", title: "Забираешь домой", text: "Котик переезжает к тебе! Мы остаёмся на связи и поддерживаем в период адаптации." },
              ].map((step) => (
                <div key={step.n} className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-8 h-72 flex flex-col">
                  <div className="flex-1">
                    <div className="text-3xl font-bold text-white/60 mb-4">{step.n}</div>
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-white/80 leading-relaxed text-sm">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-12 py-4 text-lg font-semibold">
                Найти котика прямо сейчас
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Частые вопросы</h2>
                <p className="text-xl text-white/80 leading-relaxed">Всё, что нужно знать об усыновлении: от первого шага до счастливой жизни вместе.</p>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur overflow-hidden">
                    <button onClick={() => toggleFaq(index)} className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors">
                      <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                      {openFaq === index ? <Minus className="w-5 h-5 flex-shrink-0" /> : <Plus className="w-5 h-5 flex-shrink-0" />}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-black/20 ring-1 ring-white/15 backdrop-blur p-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Свяжитесь с нами</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="rounded-2xl bg-white/95 text-black p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Написать нам</h3>
                {formStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="text-5xl mb-4">🐱</div>
                    <h4 className="text-xl font-bold mb-2">Заявка отправлена!</h4>
                    <p className="text-gray-600">Мы ответим в течение одного рабочего дня.</p>
                    <button onClick={() => setFormStatus("idle")} className="mt-6 text-sm text-gray-500 underline">Отправить ещё одно сообщение</button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Имя</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">Сообщение</label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Хочу усыновить котика, представляю приют или просто хочу помочь..."
                      />
                    </div>
                    {formStatus === "error" && (
                      <p className="text-red-500 text-sm">Ошибка отправки. Проверьте настройки и попробуйте снова.</p>
                    )}
                    <Button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-3 font-normal text-base disabled:opacity-60"
                    >
                      {formStatus === "loading" ? "Отправляем..." : "Отправить сообщение"}
                    </Button>
                  </form>
                )}
              </div>

              <div className="space-y-8">
                <p className="text-xl text-white/90 leading-relaxed">
                  Хочешь разместить котиков своего приюта? Есть вопросы об усыновлении? Пиши — мы отвечаем в течение одного рабочего дня.
                </p>
                <div className="rounded-2xl bg-white/95 text-black p-6 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                      alt="Анна Соколова"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">Анна Соколова</h4>
                      <p className="text-gray-600">Куратор платформы</p>
                    </div>
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-lg flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Написать
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-white/[0.03] backdrop-blur-2xl ring-1 ring-white/10 p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Icon name="Cat" className="w-6 h-6" />
                  <span className="text-xl font-semibold">КотоДом</span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Онлайн-платформа для поиска и усыновления котиков из приютов по всей России. Помогаем найти дом каждому пушистику.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6">УСЫНОВЛЕНИЕ</h3>
                <ul className="space-y-3">
                  {["Все котики", "Котята", "Взрослые коты", "Особые питомцы"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6">О НАС</h3>
                <ul className="space-y-3">
                  {["Наша миссия", "Приюты-партнёры", "Команда", "Как помочь"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-6">ПОДДЕРЖКА</h3>
                <ul className="space-y-3">
                  {["Справочный центр", "Контакты", "Вопросы и ответы", "Условия"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-12 mb-12">
              <div className="max-w-md">
                <h3 className="text-lg font-semibold mb-4">Новые котики — первым</h3>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Введите ваш email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/5 ring-1 ring-white/20 backdrop-blur border-0 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/30 focus:outline-none"
                  />
                  <Button className="bg-white text-black hover:bg-white/90 rounded-lg px-6 h-[50px]">Подписаться</Button>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8">
              <p className="text-white/60 text-sm text-center">© 2025 КотоДом — помогаем котикам найти дом</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
