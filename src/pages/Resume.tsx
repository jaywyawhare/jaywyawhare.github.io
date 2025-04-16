const Resume = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Jay Wyawhare</h1>
          <p className="text-gray-600">Software Engineer & AI Developer</p>
          <div className="text-sm text-gray-500 mt-2">
            <p>contact@jaywyawhare.com</p>
            <p>Location: India</p>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {['AI/ML', 'TypeScript', 'React', 'Python', 'Security', 'Cloud'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
