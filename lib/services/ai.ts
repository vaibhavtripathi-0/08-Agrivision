export interface ChatMessage {
  id: string;
  sender: 'user' | 'krishimitra' | 'expert';
  text: string;
  timestamp: string;
  mediaUrl?: string;
  suggestedActions?: string[];
  isDemo?: boolean;
}

export class AIService {
  static async queryKrishiMitra(
    userPrompt: string,
    farmContext?: {
      location?: string;
      crop?: string;
      fieldArea?: string;
      soilType?: string;
    }
  ): Promise<ChatMessage> {
    const isLiveConfigured = process.env.AI_API_KEY && process.env.AI_API_KEY.length > 5;

    const queryLower = userPrompt.toLowerCase();

    let responseText = "";
    let suggestedActions: string[] = [];

    if (queryLower.includes('yellow') || queryLower.includes('पीली') || queryLower.includes('peeli')) {
      responseText = `Samajh gaya 👍

Yellow leaves ke kuch main reasons ho sakte hain:
1. **Nitrogen Deficiency** (Sabse common wheat me)
2. **Overwatering / Waterlogging**
3. **Yellow Rust (Peela Ratua) pest infection**

Ek clear photo 📸 bhejo, main disease symptom scanner se test karke batata hoon.

Waise aapki wheat crop abhi kitne din ki hai?`;
      suggestedActions = ['📸 Upload Leaf Photo', '🧪 Check Soil Nitrogen', '👨‍🌾 Talk to Mathura Expert'];
    } else if (queryLower.includes('sowing') || queryLower.includes('buai') || queryLower.includes('बुआई')) {
      responseText = `Mathura (UP) ke loamy soil aur current weather ke mutabiq:

- **Ideal Sowing Window:** Oct 25 - Nov 15
- **Recommended Seed Rate:** 40 kg per acre
- **Seed Treatment:** Trichoderma viride (4g/kg seed) for fungus protection.

Aapki field #1 me Nitrogen level 140 ppm hai, jo sow karne ke liye perfectly suitable hai.`;
      suggestedActions = ['🌾 Recommend Best Seed Variety', '💧 Check Soil Moisture', '💰 View Market Seed Rates'];
    } else if (queryLower.includes('irrigation') || queryLower.includes('pani') || queryLower.includes('पानी') || queryLower.includes('सिंचाई')) {
      responseText = `Current weather forecast ke hisaab se kal Mathura me **78% rain expected** hai 🌧.

**My Advice:** Aaj irrigation **delay karein**. Isse lagbhag 15,000 Litres paani aur diesel expense bachega.

Barish ke baad soil moisture gauge dubara check karein!`;
      suggestedActions = ['🌦 View 7-Day Weather Forecast', '📊 Check Water Status (90%)'];
    } else {
      responseText = `Namaste! Main **KrishiMitra** 🌾, aapka intelligent farming companion.

Aapke Mathura farm (2 Acres Wheat, Loamy Soil) ke context ke hisaab se main aapko pest control, irrigation schedule, soil health aur mandi prices me help kar sakta hoon.

Aap mujhse Hindi, English ya Hinglish me pooch sakte hain!`;
      suggestedActions = ['📸 Scan Leaf Disease', '💰 Check Agra Mandi Rates', '🌦 Rain Forecast'];
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'krishimitra',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions,
      isDemo: !isLiveConfigured,
    };
  }
}
