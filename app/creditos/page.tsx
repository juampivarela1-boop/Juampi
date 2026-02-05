export default function Creditos() {
  return (
    <main className="container-page py-16 min-h-[40vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Créditos y contacto</h1>
      <div className="bg-gray-100 rounded p-6 shadow text-center">
        <p className="font-semibold text-black mb-2">Desarrollado por Juan Pablo Varela</p>
        <p className="mb-1 text-black">
          <a href="mailto:varelajuanpablo18@gmail.com" className="text-blue-600 underline">varelajuanpablo18@gmail.com</a>
        </p>
        <p className="mb-1 text-black">
          <a href="tel:+5492255620930" className="text-blue-600 underline">+54 9 2255 620930</a>
        </p>
      </div>
    </main>
  );
}
