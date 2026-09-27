# Computes radial-gradient stops that reproduce SkyLayer's former `starGlow` SVG filter
# (feGaussianBlur σ=3.5 + σ=1.5 + SourceGraphic, merged "over") for a disc of radius r,
# so each star can be drawn as ONE gradient circle with no filter (no per-frame filter cost).
import numpy as np, sys, json
S1, S2 = 3.5, 1.5
def profile(r, n=13):
    R = r + 4 * S1
    step = 0.05
    xs = np.arange(-R - 4*S1, R + 4*S1, step)
    X, Y = np.meshgrid(xs, xs)
    disc = (X**2 + Y**2 <= r*r).astype(float)
    def blur(img, s):
        k = np.arange(-4*s, 4*s + step, step); g = np.exp(-k**2/(2*s*s)); g /= g.sum()
        img = np.apply_along_axis(lambda m: np.convolve(m, g, 'same'), 0, img)
        return np.apply_along_axis(lambda m: np.convolve(m, g, 'same'), 1, img)
    # blur is separable & radially symmetric: only need the centre row
    b1, b2 = blur(disc, S1), blur(disc, S2)
    c = len(xs)//2
    row = lambda a: a[c, c:]
    d = xs[c:] - xs[c]
    tot = 1 - (1-row(b1))*(1-row(b2))*(1-row(disc))
    e = r / R
    offs = [0.0, e] + list(e + 0.002 + (1 - e - 0.002) * (np.linspace(0, 1, n) ** 1.6))
    return R, [(round(float(o),3), round(float(np.interp(o*R, d, tot)) if o > r/R + 1e-4 else 1.0, 4)) for o in offs]
if __name__ == '__main__':
    out = {}
    for r in map(float, sys.argv[1:]):
        R, st = profile(r); out[str(r)] = {'R': round(R, 2), 'stops': st}
    print(json.dumps(out))
