import React from 'react';
import { Camera, Award, Target, Users, Zap, Heart, Sparkles } from 'lucide-react';
import postsData from '../data/posts.json';

export default function AboutPage() {
  const posts = postsData.posts || [];

  // Extract unique authors
  const authorsMap = new Map();
  posts.forEach(p => {
    if (!authorsMap.has(p.author.name)) {
      authorsMap.set(p.author.name, p.author);
    }
  });
  const authors = Array.from(authorsMap.values());

  const values = [
    {
      title: 'الجودة أولاً',
      desc: 'محتوى مدروس ومكتوب بخبرة من مصورين متمرسين لنقل المعرفة الحقيقية.',
      icon: Award
    },
    {
      title: 'تركيز عملي',
      desc: 'أمثلة واقعية يمكنك تطبيقها اليوم بكاميرتك أياً كان مستواك.',
      icon: Target
    },
    {
      title: 'المجتمع',
      desc: 'تعلم وتطور مع آلاف المصورين والشغوفين بعالم الصورة والإبداع.',
      icon: Users
    },
    {
      title: 'دائماً محدث',
      desc: 'نواكب أحدث الاتجاهات والتقنيات والمعدات في عالم التصوير المتسارع.',
      icon: Zap
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs sm:text-sm font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>من نحن</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
          مهمتنا هي{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
            الإعلام والإلهام
          </span>
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
          مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين ونصائح عملية لتطوير مهاراتكم. نحن شغوفون بمشاركة المعرفة ومساعدة المصورين على تنمية مهاراتهم من خلال محتوى عالي الجودة.
        </p>
      </section>

      {/* Values Section */}
      <section className="space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-2">قيمنا</h2>
          <p className="text-neutral-400 text-sm">المبادئ التي توجه كل ما نقوم بإنشائه</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="bg-[#161616] border border-white/5 hover:border-orange-500/40 p-8 rounded-3xl space-y-4 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto text-orange-400">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">{val.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Authors / Team Section */}
      <section className="space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-2">فريقنا</h2>
          <p className="text-neutral-400 text-sm">
            فريقنا من المصورين والكتاب ذوي الخبرة شغوفون بمشاركة معرفتهم مع المجتمع
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {authors.slice(0, 12).map((author) => (
            <div
              key={author.name}
              className="bg-[#161616] border border-white/5 p-4 rounded-2xl text-center space-y-3 hover:border-orange-500/30 transition-all"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-orange-500/40"
              />
              <div>
                <h4 className="font-bold text-white text-sm">{author.name}</h4>
                <p className="text-xs text-neutral-400">{author.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
