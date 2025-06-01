import React, { useState } from 'react'
import { FaSearch, FaQuran, FaBookOpen, FaFilter } from 'react-icons/fa'

const QuranReferences = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Sample Quran verses data
  const verses = [
    {
      id: 1,
      surah: "Ar-Rum",
      number: "30:21",
      text: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought.",
      arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
      category: "marriage"
    },
    {
      id: 2,
      surah: "An-Nisa",
      number: "4:1",
      text: "O mankind, fear your Lord, who created you from one soul and created from it its mate and dispersed from both of them many men and women. And fear Allah, through whom you ask one another, and the wombs. Indeed Allah is ever, over you, an Observer.",
      arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً ۚ وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ ۚ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا",
      category: "family"
    },
    {
      id: 3,
      surah: "An-Nisa",
      number: "4:19",
      text: "O you who have believed, it is not lawful for you to inherit women by compulsion. And do not make difficulties for them in order to take [back] part of what you gave them unless they commit a clear immorality. And live with them in kindness. For if you dislike them - perhaps you dislike a thing and Allah makes therein much good.",
      arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا يَحِلُّ لَكُمْ أَن تَرِثُوا النِّسَاءَ كَرْهًا ۖ وَلَا تَعْضُلُوهُنَّ لِتَذْهَبُوا بِبَعْضِ مَا آتَيْتُمُوهُنَّ إِلَّا أَن يَأْتِينَ بِفَاحِشَةٍ مُّبَيِّنَةٍ ۚ وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ ۚ فَإِن كَرِهْتُمُوهُنَّ فَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَيَجْعَلَ اللَّهُ فِيهِ خَيْرًا كَثِيرًا",
      category: "marriage"
    },
    {
      id: 4,
      surah: "Al-Baqarah",
      number: "2:187",
      text: "They are clothing for you and you are clothing for them.",
      arabic: "هُنَّ لِبَاسٌ لَّكُمْ وَأَنتُمْ لِبَاسٌ لَّهُنَّ",
      category: "marriage"
    },
    {
      id: 5,
      surah: "Al-Isra",
      number: "17:23-24",
      text: "And your Lord has decreed that you not worship except Him, and to parents, good treatment. Whether one or both of them reach old age [while] with you, say not to them [so much as], 'uff,' and do not repel them but speak to them a noble word. And lower to them the wing of humility out of mercy and say, 'My Lord, have mercy upon them as they brought me up [when I was] small.'",
      arabic: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا. وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
      category: "parents"
    },
    {
      id: 6,
      surah: "Luqman",
      number: "31:14",
      text: "And We have enjoined upon man [care] for his parents. His mother carried him, [increasing her] in weakness upon weakness, and his weaning is in two years. Be grateful to Me and to your parents; to Me is the [final] destination.",
      arabic: "وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ حَمَلَتْهُ أُمُّهُ وَهْنًا عَلَىٰ وَهْنٍ وَفِصَالُهُ فِي عَامَيْنِ أَنِ اشْكُرْ لِي وَلِوَالِدَيْكَ إِلَيَّ الْمَصِيرُ",
      category: "parents"
    },
    {
      id: 7,
      surah: "At-Tahrim",
      number: "66:6",
      text: "O you who have believed, protect yourselves and your families from a Fire whose fuel is people and stones, over which are [appointed] angels, harsh and severe; they do not disobey Allah in what He commands them but do what they are commanded.",
      arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا وَقُودُهَا النَّاسُ وَالْحِجَارَةُ عَلَيْهَا مَلَائِكَةٌ غِلَاظٌ شِدَادٌ لَّا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ وَيَفْعَلُونَ مَا يُؤْمَرُونَ",
      category: "family"
    },
    {
      id: 8,
      surah: "Al-Furqan",
      number: "25:74",
      text: "And those who say, 'Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.'",
      arabic: "وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
      category: "family"
    },
    {
      id: 9,
      surah: "An-Nisa",
      number: "4:34",
      text: "Men are in charge of women by [right of] what Allah has given one over the other and what they spend [for maintenance] from their wealth. So righteous women are devoutly obedient, guarding in [the husband's] absence what Allah would have them guard.",
      arabic: "الرِّجَالُ قَوَّامُونَ عَلَى النِّسَاءِ بِمَا فَضَّلَ اللَّهُ بَعْضَهُمْ عَلَىٰ بَعْضٍ وَبِمَا أَنفَقُوا مِنْ أَمْوَالِهِمْ ۚ فَالصَّالِحَاتُ قَانِتَاتٌ حَافِظَاتٌ لِّلْغَيْبِ بِمَا حَفِظَ اللَّهُ",
      category: "marriage"
    },
    {
      id: 10,
      surah: "Al-Baqarah",
      number: "2:233",
      text: "Mothers may breastfeed their children two complete years for whoever wishes to complete the nursing [period]. Upon the father is the mothers' provision and their clothing according to what is acceptable. No person is charged with more than his capacity.",
      arabic: "وَالْوَالِدَاتُ يُرْضِعْنَ أَوْلَادَهُنَّ حَوْلَيْنِ كَامِلَيْنِ ۖ لِمَنْ أَرَادَ أَن يُتِمَّ الرَّضَاعَةَ ۚ وَعَلَى الْمَوْلُودِ لَهُ رِزْقُهُنَّ وَكِسْوَتُهُنَّ بِالْمَعْرُوفِ ۚ لَا تُكَلَّفُ نَفْسٌ إِلَّا وُسْعَهَا",
      category: "children"
    }
  ]
  
  // Categories
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'marriage', label: 'Marriage' },
    { value: 'family', label: 'Family' },
    { value: 'parents', label: 'Parents' },
    { value: 'children', label: 'Children' }
  ]
  
  // Filter verses based on search term and category
  const filteredVerses = verses.filter(verse => {
    const matchesSearch = verse.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          verse.surah.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          verse.number.includes(searchTerm) ||
                          verse.arabic.includes(searchTerm);
    
    const matchesCategory = selectedCategory === 'all' || verse.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Quranic References</h1>
            <p className="text-xl mb-0">
              Explore verses from the Holy Quran related to marriage, family, and relationships
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <div className="flex-grow mb-4 md:mb-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by keyword, surah name, or verse number..."
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  className="appearance-none w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <FaFilter className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verses List Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              {filteredVerses.length} {filteredVerses.length === 1 ? 'Verse' : 'Verses'} Found
            </h2>
            
            {filteredVerses.length > 0 ? (
              <div className="space-y-6">
                {filteredVerses.map(verse => (
                  <div key={verse.id} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600">
                          <FaQuran size={16} />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-primary-700">
                            Surah {verse.surah} ({verse.number})
                          </h3>
                          <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                            {verse.category.charAt(0).toUpperCase() + verse.category.slice(1)}
                          </span>
                        </div>
                        <p className="text-lg text-gray-800 mb-4">{verse.text}</p>
                        <p className="text-lg font-arabic text-right text-gray-700">{verse.arabic}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Verses Found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Understanding Quranic Guidance</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              The Holy Quran provides comprehensive guidance on all aspects of human life, including marriage, family relationships, and social interactions. The verses presented here offer divine wisdom on establishing and maintaining healthy family relationships based on love, mercy, and mutual respect.
            </p>
            
            <div className="bg-primary-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">Key Themes in Quranic Guidance on Family</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 mr-2 text-xs">1</span>
                  <div>
                    <span className="font-semibold">Tranquility (Sakinah):</span>
                    <span className="text-gray-700"> The Quran describes marriage as a source of peace and comfort, where spouses find tranquility in each other's company.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 mr-2 text-xs">2</span>
                  <div>
                    <span className="font-semibold">Affection and Mercy:</span>
                    <span className="text-gray-700"> The concepts of mawaddah (love) and rahmah (mercy) are emphasized as essential elements of marital relationships.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 mr-2 text-xs">3</span>
                  <div>
                    <span className="font-semibold">Rights and Responsibilities:</span>
                    <span className="text-gray-700"> The Quran outlines clear rights and responsibilities for both spouses, promoting a balanced and just relationship.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 mr-2 text-xs">4</span>
                  <div>
                    <span className="font-semibold">Respect for Parents:</span>
                    <span className="text-gray-700"> The Quran places great emphasis on respecting, honoring, and caring for parents, especially in their old age.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 mr-2 text-xs">5</span>
                  <div>
                    <span className="font-semibold">Child Rearing:</span>
                    <span className="text-gray-700"> The Quran provides guidance on raising righteous children and fulfilling parental responsibilities.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <p className="text-lg text-gray-700">
              When studying Quranic verses, it's important to understand them in their proper context and in light of the Prophet Muhammad's (peace be upon him) explanations and applications. The Quran and Sunnah together provide a comprehensive framework for establishing and maintaining healthy family relationships that please Allah and contribute to a harmonious society.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default QuranReferences
