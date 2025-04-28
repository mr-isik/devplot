import { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | DevPlot",
  description:
    "DevPlot gizlilik politikası ve kişisel verilerin korunması hakkında bilgiler.",
};

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <div className="py-16">
        <h1 className="text-4xl font-bold mb-8">Gizlilik Politikası</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Giriş</h2>
            <p>
              DevPlot olarak, kişisel verilerinizin güvenliği ve gizliliği bizim
              için önemlidir. Bu gizlilik politikası, 6698 sayılı Kişisel
              Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu
              olarak, kişisel verilerinizi nasıl topladığımızı, kullandığımızı,
              sakladığımızı ve paylaştığımızı açıklamaktadır.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Toplanan Veriler</h2>
            <p>
              Hizmetlerimizi kullanırken aşağıdaki kişisel verilerinizi
              toplayabiliriz:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Ad, soyad, e-posta adresi gibi kimlik bilgileri</li>
              <li>Kullanıcı adı ve şifre</li>
              <li>İletişim bilgileri</li>
              <li>Kullanım istatistikleri ve tercihler</li>
              <li>
                Teknik veriler (IP adresi, tarayıcı bilgileri, cihaz bilgileri)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. Verilerin Kullanım Amacı
            </h2>
            <p>Topladığımız verileri aşağıdaki amaçlar için kullanırız:</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Hizmetlerimizi sağlamak ve geliştirmek</li>
              <li>Kullanıcı hesaplarını yönetmek</li>
              <li>Güvenlik ve dolandırıcılık önleme</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
              <li>Kullanıcı deneyimini iyileştirmek</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Veri Güvenliği</h2>
            <p>
              Kişisel verilerinizin güvenliği için uygun teknik ve idari
              önlemler alıyoruz. Verileriniz şifrelenmiş olarak saklanır ve
              yetkisiz erişime karşı korunur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Veri Paylaşımı</h2>
            <p>
              Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla
              paylaşılmaz. Hizmet sağlayıcılarımızla yapılan paylaşımlar, veri
              işleme sözleşmeleri kapsamında ve KVKK'ya uygun olarak
              gerçekleştirilir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Haklarınız</h2>
            <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-6 mt-4">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>
                Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme
              </li>
              <li>
                Kişisel verilerinizin işlenme amacını ve bunların amacına uygun
                kullanılıp kullanılmadığını öğrenme
              </li>
              <li>
                Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı
                üçüncü kişileri bilme
              </li>
              <li>
                Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde
                bunların düzeltilmesini isteme
              </li>
              <li>
                KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel
                verilerinizin silinmesini veya yok edilmesini isteme
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. İletişim</h2>
            <p>
              Gizlilik politikamız hakkında sorularınız veya talepleriniz için
              <a
                href="mailto:privacy@devplot.com"
                className="text-primary hover:underline"
              >
                privacy@devplot.com
              </a>
              adresinden bize ulaşabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Güncellemeler</h2>
            <p>
              Bu gizlilik politikası periyodik olarak güncellenebilir. Önemli
              değişiklikler olması durumunda size bildirim yapılacaktır.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
