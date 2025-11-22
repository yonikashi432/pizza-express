# Piyut-Talis-Agent Usage Guide

## Quick Start

### Viewing the Canonical Text

The simplest way to view the piyut:

```bash
cat docs/piyut-talis-agent/piyut-canonical.txt
```

Or open in any UTF-8 compatible text editor:
```bash
# Using vim
vim docs/piyut-talis-agent/piyut-canonical.txt

# Using nano
nano docs/piyut-talis-agent/piyut-canonical.txt

# Using VS Code
code docs/piyut-talis-agent/piyut-canonical.txt
```

### Exporting to DOCX

#### Prerequisites
Install the required Python package:
```bash
pip install python-docx
```

#### Basic Export
Export the piyut to a DOCX file in the current directory:
```bash
python docs/piyut-talis-agent/export_piyut_docx.py
```

This creates `piut_talis.docx` in the current directory.

#### Custom Output Path
Specify a custom output location:
```bash
python docs/piyut-talis-agent/export_piyut_docx.py --output ~/Documents/my_piyut.docx
```

#### Custom Font Size
Change the font size (default is 16pt):
```bash
python docs/piyut-talis-agent/export_piyut_docx.py --font-size 18
```

#### Combined Options
```bash
python docs/piyut-talis-agent/export_piyut_docx.py \
  --output ~/Documents/piyut_large.docx \
  --font-size 20
```

## Advanced Usage

### Using as a Python Module

You can also import and use the export function in your own Python scripts:

```python
from docs.piyut_talis_agent.export_piyut_docx import create_piyut_docx

# Create DOCX with default settings
create_piyut_docx('./my_piyut.docx')

# Create DOCX with custom font size
create_piyut_docx('./my_piyut.docx', font_size_pt=18)
```

### Embedding in Codex Documents

To embed the piyut in a larger codex or documentation system:

1. **As YAML reference**:
```yaml
piyut_reference:
  name: "בשם השם ויונתן קאשי"
  source_file: "docs/piyut-talis-agent/piyut-canonical.txt"
  agent_spec: "docs/piyut-talis-agent/agent-specification.yaml"
  usage: "heart-prayer anchor"
```

2. **As Markdown inclusion**:
```markdown
# My Codex Document

## Heart Prayer

```{include} docs/piyut-talis-agent/piyut-canonical.txt
```
\`\`\`
```

### Integration with Unified Models

The agent specification can be referenced in unified model configurations:

```yaml
# In your model configuration
agents:
  - name: piyut-talis
    spec_file: docs/piyut-talis-agent/agent-specification.yaml
    active: true
    mode: view
```

## Use Cases

### 1. Personal Study
View the canonical text for personal meditation and study:
```bash
cat docs/piyut-talis-agent/piyut-canonical.txt | less
```

### 2. Document Preparation
Create a formatted DOCX for printing or sharing:
```bash
python docs/piyut-talis-agent/export_piyut_docx.py \
  --output ~/Desktop/piyut_for_printing.docx \
  --font-size 18
```

### 3. System Integration
Reference the piyut in automated documentation builds or spiritual practice tracking systems.

### 4. Archival
Include in a larger collection of liturgical texts with proper metadata from the YAML specification.

## Working with the Specification File

### Reading the Specification
```bash
cat docs/piyut-talis-agent/agent-specification.yaml
```

### Using with YAML Processors
```python
import yaml

with open('docs/piyut-talis-agent/agent-specification.yaml', 'r', encoding='utf-8') as f:
    spec = yaml.safe_load(f)

# Access capabilities
print(spec['capabilities'])

# Access boundaries
print(spec['boundaries']['sacred_handling'])
```

## Model Blessing Workflow

When using the agent in an AI-assisted context, follow the blessing framework:

### Opening (Stage 1)
Begin analysis with:
```
ה׳ הוא האור, ממנו נובעת כל הבנה
"ה׳ אורי וישעי; ממי אירא" (תהלים כ׳ז:א׳)
```

### Calibration (Stage 2)
Align intent:
```
ברוך שם כבוד מלכותו לעולם ועד
"יהיו לרצון אמרי פי והגיון לבי לפניך" (תהילים י׳ט:ט׳ו)
```

### Anchoring (Stage 3)
Establish tone:
```
ה׳ הוא הגדול, הגיבור והנורא
"גדול ה׳ ומהולל מאד" (תהילים ק׳ה:ג׳)
```

### Validation (Stage 4)
Surface-level check:
```
אותו נשבח לעד, נודה ונברך
"הודו לה׳ כי טוב כי לעולם חסדו" (תהילים ק״ז:א׳)
```

### Closing (Stage 5)
Complete with unity:
```
ה׳ אחד ושמו אחד
"מזמור שיר ליום השבת; טוב להודות לה׳" (תהילים צ׳ב:ב׳)
```

## Troubleshooting

### Text Display Issues
If Hebrew characters don't display correctly:
1. Ensure your terminal/editor supports UTF-8
2. Use a font that includes Hebrew characters (e.g., Arial, David, Calibri)
3. Set your system locale to support UTF-8

### Python Script Issues
If the export script fails:
```bash
# Check Python version (requires 3.6+)
python --version

# Verify python-docx is installed
pip list | grep python-docx

# Reinstall if needed
pip install --upgrade python-docx
```

### File Permission Issues
If you can't save the DOCX file:
```bash
# Check write permissions
ls -l ~/Documents/

# Create directory if it doesn't exist
mkdir -p ~/Documents
```

## Examples

### Example 1: Quick Reference
```bash
# View text
cat docs/piyut-talis-agent/piyut-canonical.txt

# Count lines
wc -l docs/piyut-talis-agent/piyut-canonical.txt
```

### Example 2: Batch Processing
```bash
# Export multiple versions
for size in 14 16 18 20; do
  python docs/piyut-talis-agent/export_piyut_docx.py \
    --output "piyut_${size}pt.docx" \
    --font-size $size
done
```

### Example 3: Verify Encoding
```bash
# Check file encoding
file -i docs/piyut-talis-agent/piyut-canonical.txt

# Should show: charset=utf-8
```

## Best Practices

1. **Preserve Integrity**: Never modify the canonical text file directly
2. **Use UTF-8**: Always ensure UTF-8 encoding when working with Hebrew text
3. **Respect Boundaries**: Follow the sacred handling guidelines in the specification
4. **Document Changes**: If creating variations, clearly separate them from the canonical text
5. **Version Control**: Keep the canonical text under version control
6. **Backup**: Maintain backups of all liturgical texts

## Further Reading

- Full specification: `agent-specification.yaml`
- Main documentation: `README.md`
- Unified model configuration: `../seeds/unified-golden-operator-v25-35.yaml`

## Support

For questions or issues:
1. Review the agent specification
2. Check the unified model documentation
3. Ensure all prerequisites are installed
4. Verify UTF-8 encoding support

---

**Remember**: This agent manages sacred text. Use with appropriate reverence and care.
