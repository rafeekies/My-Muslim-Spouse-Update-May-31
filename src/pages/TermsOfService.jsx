import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
            <p className="text-gray-600 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                Welcome to My Muslim Spouse. By accessing or using our website and services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our service.
              </p>
              <p className="text-gray-700 mt-2">
                These Terms constitute a legally binding agreement between you and My Muslim Spouse regarding your use of our matrimonial service. Please read them carefully.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Eligibility</h2>
              <p className="text-gray-700">
                To use our service, you must:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                <li>Be at least 18 years of age</li>
                <li>Be legally able to enter into a binding contract</li>
                <li>Not be prohibited from using the service under applicable laws</li>
                <li>Be a Muslim or someone genuinely interested in marriage according to Islamic principles</li>
                <li>Be single, divorced, or widowed and seeking marriage</li>
              </ul>
              <p className="text-gray-700 mt-2">
                By using our service, you represent and warrant that you meet all eligibility requirements.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Account Registration</h2>
              <p className="text-gray-700">
                To access certain features of our service, you must register for an account. When registering, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              <p className="text-gray-700 mt-2">
                You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We cannot and will not be liable for any loss or damage arising from your failure to comply with these obligations.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. User Conduct</h2>
              <p className="text-gray-700">
                When using our service, you agree not to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                <li>Violate any applicable laws, regulations, or Islamic principles</li>
                <li>Create a false identity or impersonate another person</li>
                <li>Provide false, misleading, or inaccurate information</li>
                <li>Use the service for any purpose other than seeking a spouse for marriage</li>
                <li>Harass, abuse, or harm another person</li>
                <li>Send spam or unsolicited messages</li>
                <li>Post or share inappropriate, obscene, or offensive content</li>
                <li>Infringe on the rights of others, including privacy and intellectual property rights</li>
                <li>Use the service for commercial purposes without our prior written consent</li>
                <li>Attempt to access, tamper with, or use non-public areas of the service</li>
                <li>Interfere with or disrupt the service or servers connected to the service</li>
                <li>Introduce viruses, malware, or other harmful code</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Content Guidelines</h2>
              <p className="text-gray-700">
                All content shared on our platform must adhere to Islamic principles and values. This includes:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                <li>Profile photos must be modest and respectful</li>
                <li>Communications should be respectful and appropriate</li>
                <li>Content should not contain inappropriate language, images, or references</li>
                <li>Interactions should be conducted with the intention of seeking marriage</li>
              </ul>
              <p className="text-gray-700 mt-2">
                We reserve the right to remove any content that violates these guidelines or that we deem inappropriate for our platform.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Membership and Payments</h2>
              <p className="text-gray-700">
                We offer both free and premium membership options. By subscribing to a premium membership, you agree to pay all fees associated with your selected plan. All payments are processed securely through our payment processors.
              </p>
              <p className="text-gray-700 mt-2">
                Subscription fees are billed in advance on a monthly or annual basis, depending on your selected plan. Your subscription will automatically renew unless you cancel it before the renewal date.
              </p>
              <p className="text-gray-700 mt-2">
                Refunds are provided in accordance with our Refund Policy, which is available upon request.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Termination</h2>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate your account and access to our service at any time, without notice or liability, for any reason, including if we believe you have violated these Terms.
              </p>
              <p className="text-gray-700 mt-2">
                You may terminate your account at any time by following the instructions on our website or by contacting our customer support.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Disclaimer of Warranties</h2>
              <p className="text-gray-700">
                Our service is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the reliability, accuracy, or availability of our service.
              </p>
              <p className="text-gray-700 mt-2">
                While we take measures to verify user information, we cannot guarantee the identity, character, or intentions of any user. You are solely responsible for your interactions with other users.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
              <p className="text-gray-700">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of or inability to use our service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Dispute Resolution</h2>
              <p className="text-gray-700">
                Any disputes arising from or relating to these Terms or your use of our service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted in [Jurisdiction], and the language of arbitration shall be English.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to Terms</h2>
              <p className="text-gray-700">
                We may modify these Terms at any time by posting the revised terms on our website. Your continued use of our service after such changes constitutes your acceptance of the revised Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions or concerns about these Terms, please contact us at:
              </p>
              <p className="text-gray-700 mt-2">
                Email: terms@mymuslimspouse.com<br />
                Address: 123 Islamic Center Drive, Suite 456, Anytown, USA 12345
              </p>
            </section>
            
            <div className="pt-4 border-t">
              <Link to="/" className="text-primary-600 hover:text-primary-700">
                &larr; Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
