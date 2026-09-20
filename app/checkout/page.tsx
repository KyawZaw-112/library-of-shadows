"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { provinces } from "@/lib/catalog";
import { thb } from "@/lib/money";
import { productBySlug, useStore } from "@/lib/store";

export default function CheckoutPage() {
  const { user, cart, placeOrder } = useStore();
  const router = useRouter();
  const [province, setProvince] = useState("Bangkok");
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [payment, setPayment] = useState("promptpay");
  const [usePoints, setUsePoints] = useState(false);
  const [err, setErr] = useState("");
  const lines = cart.map((l) => ({ ...l, p: productBySlug(l.slug)! })).filter((x) => x.p);
  const sub = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const fee = provinces.find((p) => p.name === province)?.fee ?? 100;
  const welcome = coupon.trim().toUpperCase() === "WELCOME10" && user && !user.firstOrderUsed;
  const disc = welcome ? Math.round(sub * 0.1) : 0;
  const pVal = usePoints && (user?.points ?? 0) >= 100 ? Math.min(user!.points, Math.floor(sub / 10) * 10) / 5 : 0;
  const total = Math.max(0, sub - disc - pVal + fee);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = placeOrder({ address, province, payment, coupon, usePoints });
    if (typeof res === "string") {
      setErr(res);
      return;
    }
    router.push(`/account/order/?id=${encodeURIComponent(res.id)}`);
  };

  if (!user) {
    return (
      <main className="p-10 text-center">
        <Link href="/login/" className="text-ember">
          Sign in to checkout
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4">
        <h1 className="font-display text-4xl text-mist">Checkout</h1>
        <input
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Street, district"
          className="glass w-full rounded-xl px-4 py-3 text-sm"
        />
        <select value={province} onChange={(e) => setProvince(e.target.value)} className="glass w-full rounded-xl px-4 py-3 text-sm">
          {provinces.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name} · {thb(p.fee)} delivery
            </option>
          ))}
        </select>
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Coupon (WELCOME10)"
          className="glass w-full rounded-xl px-4 py-3 text-sm"
        />
        <fieldset className="space-y-2 text-sm">
          <legend className="text-mist/60">Payment</legend>
          {["promptpay", "card", "ewallet"].map((m) => (
            <label key={m} className="glass flex items-center gap-2 rounded-xl px-4 py-2 capitalize">
              <input type="radio" name="pay" checked={payment === m} onChange={() => setPayment(m)} />
              {m === "promptpay" ? "PromptPay QR" : m}
            </label>
          ))}
        </fieldset>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={usePoints} onChange={(e) => setUsePoints(e.target.checked)} />
          Use loyalty points ({user.points})
        </label>
        {payment === "promptpay" && (
          <div className="glass mx-auto grid h-40 w-40 place-items-center rounded-xl">
            <div className="grid h-28 w-28 grid-cols-5 gap-0.5 bg-mist p-2">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={i % 3 ? "bg-ink" : "bg-mist"} />
              ))}
            </div>
          </div>
        )}
        {err && <p className="text-sm text-rose">{err}</p>}
        <button className="w-full rounded-full bg-ember py-3 font-semibold text-ink">Pay {thb(total)}</button>
      </form>
      <aside className="glass h-fit rounded-2xl p-6 text-sm">
        <h2 className="font-display text-2xl text-mist">Summary</h2>
        {lines.map((l) => (
          <p key={l.slug} className="mt-2 flex justify-between text-mist/70">
            <span>
              {l.p.title} × {l.qty}
            </span>
            <span>{thb(l.p.price * l.qty)}</span>
          </p>
        ))}
        <hr className="my-4 border-ember/15" />
        <p className="flex justify-between">Subtotal {thb(sub)}</p>
        <p className="flex justify-between">Discount −{thb(disc + pVal)}</p>
        <p className="flex justify-between">Delivery {thb(fee)}</p>
        <p className="mt-2 font-display text-2xl text-ember">{thb(total)}</p>
      </aside>
    </main>
  );
}
