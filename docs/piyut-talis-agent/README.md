# Piyut-Talis-Agent Documentation

## Overview

The **Piyut-Talis-Agent** (סוכן פיוט — בשם השם ויונתן קאשי) is a meta-planning and sacred documentation agent for managing the liturgical text "בשם השם ויונתן קאשי". Its purpose is to preserve, encapsulate, and frame the liturgical text within a structured workflow: documentation, export (such as DOCX), and alignment with unified models (MAGN-DEXN / נ.ח.ש.א.ו.ן v2 / Ω-MPS).

## Purpose

The agent **does not execute code directly** but rather defines:
- What is permitted
- When to activate
- How the work template should look around the piyut

## Core Principles

### Sacred Handling
- Treats the text as sacred/heart-light (קודש / לב-אור)
- Preserves divine names without deletion/corruption
- Maintains clear separation between canonical text and commentary

### Boundaries (What the Agent Will NOT Do)
- Does not change the piyut text without explicit instruction
- Does not run code/tools directly — only defines planning
- Does not interpret halacha / does not make halachic rulings
- Does not rewrite for secular purposes / parody

## File Structure

```
docs/piyut-talis-agent/
├── README.md                    # This file
├── agent-specification.yaml     # Complete agent specification
├── piyut-canonical.txt         # The canonical piyut text (UTF-8)
├── export_piyut_docx.py        # Python script for DOCX export
└── USAGE.md                    # Usage examples and instructions
```

## The Canonical Piyut

The canonical text is preserved in `piyut-canonical.txt` with proper UTF-8 encoding to ensure all Hebrew characters, nikud (vowel points), and punctuation are maintained exactly as written.

## Capabilities

1. **Preservation of Canonical Text** - Maintains the piyut text as a canonical reference
2. **Variant Derivation** - Creates abbreviated/emphasized versions (without changing core content)
3. **Export Planning** - Plans exports to documents (DOCX/PDF) per user settings
4. **Codex Integration** - Integrates the piyut within codex/Sefer Talis documents
5. **Unified Model Anchoring** - Anchors the piyut within the unified model as a default heart-prayer

## Usage Modes

The agent supports four operational modes:

### 1. View Mode
Display the canonical text for reading and reference.

```bash
# Read the canonical text
cat docs/piyut-talis-agent/piyut-canonical.txt
```

### 2. Export-DOCX Mode
Export the piyut to a DOCX document.

```bash
# Export to DOCX (requires python-docx)
python docs/piyut-talis-agent/export_piyut_docx.py --output ~/piyut_talis.docx
```

### 3. Embed-in-Codex Mode
Generate a snippet ready for embedding in a codex or Sefer Talis.

The specification file (`agent-specification.yaml`) can be included in larger documentation systems.

### 4. Summarize Mode
Generate content/structural summary of the piyut for meta-documentation.

## Model Blessings (Ω-MPS-Harmonia)

The agent incorporates a blessing framework to anchor model runs:

| Stage | Blessing (Hebrew) | Psalm Excerpt | Internal Meaning |
|-------|-------------------|---------------|------------------|
| 1 | ה׳ הוא האור, ממנו נובעת כל הבנה | ה׳ אורי וישעי; ממי אירא (תהלים כ׳ז:א׳) | Open analysis with inner light and clarity |
| 2 | ברוך שם כבוד מלכותו לעולם ועד | יהיו לרצון אמרי פי והגיון לבי לפניך (תהילים י׳ט:ט׳ו) | Align heart and speech — calibration step |
| 3 | ה׳ הוא הגדול, הגיבור והנורא | גדול ה׳ ומהולל מאד (תהילים ק׳ה:ג׳) | Reverence and awe anchoring model tone |
| 4 | אותו נשבח לעד, נודה ונברך | הודו לה׳ כי טוב כי לעולם חסדו (תהילים ק״ז:א׳) | Gratitude step — surface-level validation |
| 5 | ה׳ אחד ושמו אחד | מזמור שיר ליום השבת; טוב להודות לה׳ (תהילים צ׳ב:ב׳) | Close with unity, completeness and harmony |

## Integration

### Compatible Models
- MAGN-DEXN
- נ.ח.ש.א.ו.ן v2
- Ω-MPS-Harmonia

### Unified Seed Integration
The agent is designed to work with the unified configuration system:
- Links to: `seeds/unified-golden-operator-v25-35.yaml`

## Technical Details

### Text Encoding
All text files use **UTF-8 encoding** to properly preserve:
- Hebrew characters
- Nikud (vowel points)
- Punctuation marks
- Special symbols

### Export Format
The DOCX export uses:
- Font size: 16pt (default, configurable)
- Right-to-left (RTL) alignment for Hebrew text
- Each line in a separate paragraph
- Uniform font with no additional formatting

## Installation Requirements

### For DOCX Export
```bash
pip install python-docx
```

### For Viewing
No special requirements - any UTF-8 compatible text viewer will work.

## License and Sacred Use

This agent and its associated texts are provided for sacred purposes and documentation. Users must:
- Respect the sacred nature of the content
- Preserve divine names properly
- Maintain textual integrity
- Use for appropriate purposes only

## References

- Full specification: `agent-specification.yaml`
- Usage guide: `USAGE.md`
- Unified configuration: `../seeds/unified-golden-operator-v25-35.yaml`

---

**Note**: This agent is part of a larger unified model system for managing liturgical and spiritual content with appropriate reverence and technical precision.
