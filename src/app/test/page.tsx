export default function TestPage() {
  return (
    <div className="min-h-screen bg-primary-black text-white p-8">
      <h1 className="text-4xl font-bold text-accent-blue mb-4">
        Test Page - Tailwind CSS
      </h1>
      <div className="bg-accent-gray p-6 rounded-lg border border-accent-blue">
        <p className="text-text-secondary mb-4">
          إذا كنت ترى هذا النص بألوان صحيحة، فـ Tailwind CSS يعمل بشكل صحيح!
        </p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-accent-blue text-white rounded hover:bg-accent-purple transition-colors">
            زر أزرق
          </button>
          <button className="px-4 py-2 bg-accent-purple text-white rounded hover:bg-accent-blue transition-colors">
            زر بنفسجي
          </button>
        </div>
      </div>
    </div>
  );
}
