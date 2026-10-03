import os
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs("public/images/projects", exist_ok=True)

WIDTH, HEIGHT = 1200, 750
BG_COLOR = (245, 243, 238)
BORDER_COLOR = (216, 213, 206)
ACCENT_GREEN = (0, 90, 54)
MUTED_GREEN = (47, 125, 91)
TEXT_DARK = (17, 17, 17)
TEXT_MUTED = (95, 95, 90)
GRID_LINE = (233, 230, 222)

def draw_base_frame(draw, code, title, subtitle):
    # Fill background
    draw.rectangle([0, 0, WIDTH, HEIGHT], fill=BG_COLOR)
    
    # Outer neat border
    draw.rectangle([30, 30, WIDTH - 30, HEIGHT - 30], outline=BORDER_COLOR, width=1)
    
    # Grid lines
    for x in range(30, WIDTH - 30, 60):
        draw.line([(x, 30), (x, HEIGHT - 30)], fill=GRID_LINE, width=1)
    for y in range(30, HEIGHT - 30, 60):
        draw.line([(30, y), (WIDTH - 30, y)], fill=GRID_LINE, width=1)
        
    # Inner viewport border
    draw.rectangle([90, 90, WIDTH - 90, HEIGHT - 90], outline=BORDER_COLOR, width=2)
    
    # Technical header bar
    draw.rectangle([90, 90, WIDTH - 90, 140], fill=(233, 228, 217), outline=BORDER_COLOR, width=1)
    
    # Small metadata
    draw.text((110, 105), f"PROJECT ARCHIVE // {code}", fill=ACCENT_GREEN)
    draw.text((WIDTH - 320, 105), "SPEC: ARCHITECTURE DIAGRAM", fill=TEXT_MUTED)
    
    # Technical footer
    draw.rectangle([90, HEIGHT - 140, WIDTH - 90, HEIGHT - 90], fill=(233, 228, 217), outline=BORDER_COLOR, width=1)
    draw.text((110, HEIGHT - 125), f"TITLE: {title}", fill=TEXT_DARK)
    draw.text((WIDTH - 360, HEIGHT - 125), f"TAG: {subtitle}", fill=TEXT_MUTED)

# 1. KAUSHAL SAATHI - Conversational Node Grid & Livelihood Topology
img1 = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
d1 = ImageDraw.Draw(img1)
draw_base_frame(d1, "01-KS", "KAUSHAL SAATHI", "AI CONVERSATIONAL INTERFACE")

# Draw connected network nodes
nodes_1 = [
    (300, 280), (450, 220), (600, 320), (750, 240), (900, 300),
    (380, 420), (550, 480), (700, 420), (840, 460)
]
connections_1 = [
    (0, 1), (1, 2), (2, 3), (3, 4), (0, 5), (1, 6), (2, 6), (2, 7), (3, 8),
    (5, 6), (6, 7), (7, 8)
]
for p1, p2 in connections_1:
    d1.line([nodes_1[p1], nodes_1[p2]], fill=MUTED_GREEN, width=2)

for i, (x, y) in enumerate(nodes_1):
    r = 16 if i == 2 else 9
    col = ACCENT_GREEN if i == 2 else (233, 228, 217)
    outline_col = ACCENT_GREEN
    d1.ellipse([x - r, y - r, x + r, y + r], fill=col, outline=outline_col, width=2)
    d1.text((x - 14, y + r + 6), f"NODE_{i:02d}", fill=TEXT_MUTED)

img1.save("public/images/projects/kaushal-saathi.webp", "WEBP", quality=92)


# 2. AI BUSINESS PHONE ASSISTANT - Audio Waveform & State Router
img2 = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
d2 = ImageDraw.Draw(img2)
draw_base_frame(d2, "02-PA", "AI BUSINESS PHONE ASSISTANT", "VOICE TELEPHONY & NLP PIPELINE")

# Draw audio waveform & state blocks
center_y = 350
for i in range(140, WIDTH - 140, 12):
    angle = (i - 140) * 0.03
    h = int(math.sin(angle) * 70 * math.sin(angle * 0.4) + math.cos(angle * 1.7) * 40)
    col = ACCENT_GREEN if (i % 24 == 0) else MUTED_GREEN
    d2.line([(i, center_y - abs(h) - 4), (i, center_y + abs(h) + 4)], fill=col, width=3)

# Draw central telephony router module
d2.rectangle([480, 260, 720, 440], outline=ACCENT_GREEN, width=2, fill=(245, 243, 238))
d2.rectangle([500, 280, 700, 310], fill=(233, 228, 217), outline=BORDER_COLOR)
d2.text((520, 290), "STT / INTENT ENGINE", fill=ACCENT_GREEN)
d2.text((515, 335), "Input: Stream Ingestion", fill=TEXT_MUTED)
d2.text((515, 360), "Processing: LLM + Context", fill=TEXT_MUTED)
d2.text((515, 385), "Output: Structured DB", fill=TEXT_MUTED)

img2.save("public/images/projects/ai-phone-assistant.webp", "WEBP", quality=92)


# 3. NAGAR ALERT HUB - Civic Disruption Radar & Geospatial Coordinates
img3 = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
d3 = ImageDraw.Draw(img3)
draw_base_frame(d3, "03-NA", "NAGAR ALERT HUB", "CIVIC DISRUPTION & GEOSPATIAL RADAR")

# Draw concentric radar circles
cx, cy = 600, 350
for radius in [60, 120, 180, 230]:
    d3.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], outline=BORDER_COLOR, width=1)
d3.line([(cx - 240, cy), (cx + 240, cy)], fill=BORDER_COLOR, width=1)
d3.line([(cx, cy - 240), (cx, cy + 240)], fill=BORDER_COLOR, width=1)

# Radar sweep line
sweep_x = cx + int(190 * math.cos(math.radians(35)))
sweep_y = cy - int(190 * math.sin(math.radians(35)))
d3.line([(cx, cy), (sweep_x, sweep_y)], fill=ACCENT_GREEN, width=2)

# Disruption hotspots
hotspots = [(cx + 70, cy - 50), (cx - 100, cy + 80), (cx + 140, cy + 90), (cx - 80, cy - 110)]
for hx, hy in hotspots:
    d3.ellipse([hx - 7, hy - 7, hx + 7, hy + 7], fill=ACCENT_GREEN, outline=(245, 243, 238), width=2)
    d3.rectangle([hx + 12, hy - 8, hx + 100, hy + 14], fill=(233, 228, 217), outline=BORDER_COLOR)
    d3.text((hx + 16, hy - 4), "CIVIC_ALERT", fill=ACCENT_GREEN)

img3.save("public/images/projects/nagar-alert.webp", "WEBP", quality=92)


# 4. KINGS & PIGS - 2D Isometric Engine & State Loops
img4 = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
d4 = ImageDraw.Draw(img4)
draw_base_frame(d4, "04-KP", "KINGS & PIGS", "GAME STATE LOOP & TILESET LOGIC")

# Draw isometric tile grid
def iso_pt(gx, gy, ox=600, oy=300):
    ix = ox + (gx - gy) * 36
    iy = oy + (gx + gy) * 18
    return ix, iy

for gx in range(-4, 5):
    p_start = iso_pt(gx, -4)
    p_end = iso_pt(gx, 4)
    d4.line([p_start, p_end], fill=BORDER_COLOR, width=1)

for gy in range(-4, 5):
    p_start = iso_pt(-4, gy)
    p_end = iso_pt(4, gy)
    d4.line([p_start, p_end], fill=BORDER_COLOR, width=1)

# Draw central game entities / boxes
for bx, by, color in [(0, 0, ACCENT_GREEN), (-2, 1, MUTED_GREEN), (2, -1, (216, 213, 206))]:
    ix, iy = iso_pt(bx, by)
    h = 24
    d4.polygon([
        (ix, iy - h),
        (ix + 36, iy + 18 - h),
        (ix, iy + 36 - h),
        (ix - 36, iy + 18 - h)
    ], fill=color, outline=(17, 17, 17))
    d4.polygon([
        (ix - 36, iy + 18 - h),
        (ix, iy + 36 - h),
        (ix, iy + 36),
        (ix - 36, iy + 18)
    ], fill=MUTED_GREEN, outline=(17, 17, 17))
    d4.polygon([
        (ix, iy + 36 - h),
        (ix + 36, iy + 18 - h),
        (ix + 36, iy + 18),
        (ix, iy + 36)
    ], fill=ACCENT_GREEN, outline=(17, 17, 17))

img4.save("public/images/projects/kings-and-pigs.webp", "WEBP", quality=92)
print("Placeholders generated successfully.")
