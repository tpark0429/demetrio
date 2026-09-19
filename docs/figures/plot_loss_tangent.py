"""Generate the loss-tangent phasor diagram used by em-102.md."""

from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Arc, FancyArrowPatch, Wedge


OUTPUT = Path(__file__).resolve().parents[2] / "assets"
plt.rcParams.update({"font.family": "DejaVu Sans", "mathtext.fontset": "dejavusans"})
ink, muted = "#172B45", "#65758B"
blue, orange, purple = "#147BB5", "#D77A16", "#7750B6"
fig = plt.figure(figsize=(5.5, 5.5), facecolor="white")
ax = fig.add_axes([.035, .035, .93, .93])
ax.set(xlim=(-.85, 3.35), ylim=(-.62, 3.7), aspect="equal")
ax.axis("off")
x, y = 1.45, 2.8
theta = np.degrees(np.arctan2(y, x))


def arrow(start, end, color, width=2.8, scale=17, zorder=3):
    ax.add_patch(FancyArrowPatch(start, end, arrowstyle="-|>",
                                mutation_scale=scale, linewidth=width,
                                color=color, shrinkA=0, shrinkB=0, zorder=zorder))


arrow((0, 0), (3.1, 0), "#B7C1CC", 1.25, 11, 1)
arrow((0, 0), (0, 3.45), "#B7C1CC", 1.25, 11, 1)
ax.text(3.1, -.24, "Re", fontsize=11, color=muted, ha="center")
ax.text(-.13, 3.43, "Im", fontsize=11, color=muted, ha="right")
ax.plot([0, x, x], [y, y, 0], color="#BAC5D2", lw=1.25, ls=(0, (4, 4)))
ax.add_patch(Wedge((0, 0), 1.02, theta, 90, facecolor="#EDE6F7", edgecolor="none"))
ax.add_patch(Arc((0, 0), 2.04, 2.04, theta1=theta, theta2=90, color=purple, lw=1.8))
arrow((0, 0), (0, y), blue)
arrow((0, 0), (x, 0), orange)
arrow((0, 0), (x, y), purple, 3.2, 19)
ax.text(.28, 1.14, r"$\delta$", fontsize=23, color=purple, ha="center")
ax.text(-.12, -.22, "O", fontsize=11, color=ink, ha="right")
ax.text(-.14, y+.03, "A", fontsize=11, color=ink, ha="right")
ax.text(x+.12, y+.02, "B", fontsize=11, color=ink)
ax.text(x+.03, -.24, "C", fontsize=11, color=ink)
ax.text(-.22, 1.8, r"$i_{\mathrm{disp}}$", fontsize=18, color=blue, ha="right")
ax.text(x/2, -.34, r"$i_{\mathrm{cond}}$", fontsize=18, color=orange, ha="center")
ax.text(1.15, 1.66, r"$i_{\mathrm{total}}$", fontsize=18, color=purple)
ax.text(2.3, .15, r"$E\; (0^\circ)$", fontsize=12, color=muted, ha="center")

OUTPUT.mkdir(exist_ok=True)
for extension in ("svg", "png"):
    fig.savefig(OUTPUT / f"loss_tangent_phasor.{extension}", dpi=200, facecolor="white")
svg_path = OUTPUT / "loss_tangent_phasor.svg"
svg_path.write_text("\n".join(line.rstrip() for line in svg_path.read_text(encoding="utf-8").splitlines()) + "\n", encoding="utf-8")
plt.close(fig)
