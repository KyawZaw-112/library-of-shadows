from pathlib import Path
import pypdf

pdf = Path(r"D:\studygo\.monkeycode\uploads\Library_of_Shadows_Digital_Business.pptx__1_-2.pdf")
reader = pypdf.PdfReader(str(pdf))
out = Path(r"D:\studygo\scripts\pdf-extract.txt")
parts = [f"pages {len(reader.pages)}\n"]
for i, page in enumerate(reader.pages, 1):
    text = page.extract_text() or ""
    parts.append(f"\n===== PAGE {i} =====\n{text}\n")
out.write_text("".join(parts), encoding="utf-8")
print("wrote", out, "chars", sum(len(p) for p in parts))
