import { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | DevPlot",
  description: "DevPlot platformu kullanım koşulları ve şartları.",
};

export default function TermsOfUsePage() {
  return (
    <Container>
      <div className="py-16">
        <h1 className="text-4xl font-bold mb-8">Kullanım Koşulları</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Genel Hükümler</h2>
            <p>
              DevPlot platformunu kullanarak, bu kullanım koşullarını kabul
              etmiş sayılırsınız. Bu koşullar, platformumuzu kullanımınızı
              düzenleyen yasal bir anlaşmadır.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Hizmet Kullanımı</h2>
            <p>
              Platformumuzu kullanırken aşağıdaki kurallara uymayı kabul
              edersiniz:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Doğru ve güncel bilgiler sağlamak</li>
              <li>Hesap güvenliğinizi korumak</li>
              <li>Yasalara ve etik kurallara uymak</li>
              <li>Diğer kullanıcıların haklarına saygı göstermek</li>
              <li>Platformun güvenliğini tehlikeye atmamak</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. Fikri Mülkiyet Hakları
            </h2>
            <p>
              Platformumuzda bulunan tüm içerikler (yazılım, tasarım, metin,
              görseller vb.) DevPlot'un fikri mülkiyetidir. Bu içeriklerin
              izinsiz kullanımı, kopyalanması veya dağıtılması yasaktır.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. Kullanıcı İçeriği
            </h2>
            <p>
              Platformumuzda paylaştığınız içeriklerden siz sorumlusunuz.
              İçeriklerinizin yasalara ve etik kurallara uygun olması
              gerekmektedir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. Hizmet Değişiklikleri
            </h2>
            <p>
              DevPlot, hizmetlerini önceden haber vermeksizin değiştirme,
              güncelleme veya sonlandırma hakkını saklı tutar.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              6. Sorumluluk Sınırları
            </h2>
            <p>
              DevPlot, platformun kesintisiz ve hatasız çalışacağını garanti
              etmez. Kullanıcılar, platformu kendi riskleri altında kullanırlar.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Hesap İptali</h2>
            <p>
              DevPlot, kullanım koşullarını ihlal eden hesapları askıya alma
              veya kalıcı olarak kapatma hakkını saklı tutar.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              8. Uyuşmazlık Çözümü
            </h2>
            <p>
              Bu kullanım koşullarından doğan uyuşmazlıklar, Türkiye Cumhuriyeti
              yasalarına tabidir ve İstanbul Mahkemeleri ve İcra Daireleri
              yetkilidir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. İletişim</h2>
            <p>
              Kullanım koşulları hakkında sorularınız için
              <a
                href="mailto:legal@devplot.com"
                className="text-primary hover:underline"
              >
                legal@devplot.com
              </a>
              adresinden bize ulaşabilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
