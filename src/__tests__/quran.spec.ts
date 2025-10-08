import { getVerse, saveVerse, getSaved, deleteSaved } from "../handlers/verse";
import { getVerseTafsir, getAllTafsirs } from "../handlers/tafsir";
import { mockRequests, mockRes, mockNext } from "../__mocks__/verse_tafsir";
import { Request } from "express";
import * as verseService from "../services/verse";
import { QueryResult } from "pg";
import { VerseJson } from "../types/quran";

describe('Get verse, tafsir', () => {
  it('gets the verse', async () => {
    await getVerse(mockRequests.getVerse, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      "sura_index": 2,
      "sura_name": "البقرة",
      "ayah_number": 255,
      "text": "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ"
    });
  });

  it('gets all tafsirs', async () => {
    await getAllTafsirs({} as Request, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.arrayContaining([
      {
        "id": 1,
        "name": "التفسير الميسر",
        "language": "ar",
        "author": "نخبة من العلماء",
        "book_name": "التفسير الميسر"
      },
      {
        "id": 2,
        "name": "تفسير الجلالين",
        "language": "ar",
        "author": "جلال الدين المحلي و السيوطي",
        "book_name": "تفسير الجلالين"
      },
      {
        "id": 3,
        "name": "تفسير السعدي",
        "language": "ar",
        "author": "عبد الرحمن بن ناصر بن عبد الله السعدي التميمي مفسر",
        "book_name": "تيسير الكريم الرحمن في تفسير كلام المنان"
      },
      {
        "id": 4,
        "name": "تفسير ابن كثير",
        "language": "ar",
        "author": "عماد الدين أبي الفداء إسماعيل بن كثير القرشي",
        "book_name": "تفسير القرآن العظيم"
      }
    ]));
  });

  it('gets a verse with tafsir', async () => {
    await getVerseTafsir(mockRequests.tafsir, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      "tafseer_id": 1,
      "tafseer_name": "التفسير الميسر",
      "ayah_url": "/quran/2/255/",
      "ayah_number": 255,
      "text": expect.stringContaining("الله الذي لا يستحق الألوهية والعبودية إلا هو، الحيُّ الذي له جميع معاني الحياة الكاملة كما يليق بجلاله، القائم على كل شيء، لا تأخذه سِنَة أي: نعاس، ولا نوم، كل ما في السماوات وما في الأرض ملك له، ولا يتجاسر أحد أن يشفع عنده إلا بإذنه، محيط علمه بجميع الكائنات ماضيها وحاضرها ومستقبلها، يعلم ما بين أيدي الخلائق من الأمور المستقبلة، وما خلفهم من الأمور الماضية، ولا يَطَّلعُ أحد من الخلق على شيء من علمه إلا بما أعلمه الله وأطلعه عليه. وسع كرسيه السماوات والأرض، والكرسي: هو موضع قدمي الرب -جل جلاله- ولا يعلم كيفيته إلا الله سبحانه، ولا يثقله سبحانه حفظهما، وهو العلي بذاته وصفاته على جميع مخلوقاته، الجامع لجميع صفات العظمة والكبرياء. وهذه الآية أعظم آية في القرآن، وتسمى: (آية الكرسي).")
    });
  });
});

describe('Verse database', () => {
  const savedVerses: VerseJson[] = [];

  it('saved a verse', async () => {

    jest.spyOn(verseService, "saveVerse").mockImplementation(async (surahNumber: number, verseNumber: number, userId: number, note?: string) => {
      const verse = await verseService.getVerse(surahNumber, verseNumber);
      const verseJson = await verse.json();
      savedVerses.push(verseJson);
      return Promise.resolve({} as QueryResult<any>);
    });

    await saveVerse(mockRequests.saveVerse, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Verse saved successfully!' });
    expect(savedVerses.length).toBe(1);
    expect(savedVerses[0]).toEqual({
      "sura_index": 2,
      "sura_name": "البقرة",
      "ayah_number": 255,
      "text": "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ"
    });
  });

  it('gets saved verse', async () => {
    jest.spyOn(verseService, "getSaved").mockResolvedValue([savedVerses[0]]);

    await getSaved({} as Request, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([savedVerses[0]]);
  });

  it('deletes saved verse', async () => {
    jest.spyOn(verseService, "deleteSaved").mockImplementation(async (verseId: number, userId: number) => {
      savedVerses.splice(0, 1);
      return Promise.resolve({rowCount: 1} as QueryResult);
    });

    await deleteSaved(mockRequests.deleteSaved, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({message: 'Verse deleted successfully.'});
  });

  it("doesn't delete verse if it doesn't exist", async () => {
    jest.spyOn(verseService, "deleteSaved").mockImplementation(async (verseId: number, userId: number) => {
      return Promise.resolve({rowCount: 0} as QueryResult);
    });

    await deleteSaved(mockRequests.deleteSaved, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({message: 'Verse does not exist.'});
  });
});