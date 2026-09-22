"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { provinces } from "@/lib/catalog";
import { thb } from "@/lib/money";
import { productBySlug, useStore } from "@/lib/store";
import { Reveal } from "@/components/ui/reveal";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { user, cart, placeOrder } = useStore();
  const router = useRouter();
  const [province, setProvince] = useState("Bangkok");
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [payment, setPayment] = useState("promptpay");
  const [usePoints, setUsePoints] = useState(false);
  const [useCredit, setUseCredit] = useState(false);
  const [err, setErr] = useState("");
  const lines = cart.map((l) => ({ ...l, p: productBySlug(l.slug)! })).filter((x) => x.p);
  const sub = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const fee = provinces.find((p) => p.name === province)?.fee ?? 100;
  const welcome = coupon.trim().toUpperCase() === "WELCOME10" && user && !user.firstOrderUsed;
  const disc = welcome ? Math.round(sub * 0.1) : 0;
  const pVal = usePoints && (user?.points ?? 0) >= 100 ? Math.min(user!.points, Math.floor(sub / 10) * 10) / 5 : 0;
  const beforeCredit = Math.max(0, sub - disc - pVal + fee);
  const creditVal = useCredit ? Math.min(user?.credit || 0, beforeCredit) : 0;
  const total = beforeCredit - creditVal;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const res = placeOrder({ address, province, payment, coupon, usePoints, useCredit });
    if (typeof res === "string") {
      setErr(res);
      return;
    }
    router.push(`/account/order/?id=${encodeURIComponent(res.id)}`);
  };

  if (!user) {
    return (
      <main className="p-10 text-center">
        <Link href="/login/" className="text-white underline">
          Sign in to checkout
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-5xl gap-12 px-4 py-16 md:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-4">
      <Reveal>
        <h1 className="font-display text-5xl text-white">Checkout</h1>
      </Reveal>
        <input
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Street, district"
          className="glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30"
        />
        <select value={province} onChange={(e) => setProvince(e.target.value)} className="glass w-full rounded-xl px-4 py-3 text-sm text-white">
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
          className="glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30"
        />
        <fieldset className="space-y-2 text-sm">
          <legend className="text-white/55">Payment</legend>
          {[
            { id: "promptpay", label: "PromptPay QR" },
            { id: "card", label: "Credit / debit card" },
            { id: "ewallet", label: "E-wallet" },
            { id: "cod", label: "Cash on delivery" },
          ].map((m) => (
            <label key={m.id} className="glass flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-white/80">
              <input type="radio" name="pay" checked={payment === m.id} onChange={() => setPayment(m.id)} className="accent-white" />
              {m.label}
            </label>
          ))}
        </fieldset>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80">
          <input type="checkbox" checked={usePoints} onChange={(e) => setUsePoints(e.target.checked)} className="accent-white" />
          Use loyalty points ({user.points})
        </label>
        {(user.credit || 0) > 0 && (
          <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80">
            <input type="checkbox" checked={useCredit} onChange={(e) => setUseCredit(e.target.checked)} className="accent-white" />
            Use trade-in credit ({thb(user.credit)})
          </label>
        )}
        {payment === "promptpay" && (
          <div className="mx-auto grid h-40 w-40 place-items-center border border-white/10 bg-white/[0.02]">
            <div className="grid h-28 w-28 grid-cols-5 gap-0.5 bg-white p-2">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={i % 3 ? "bg-black" : "bg-white"} />
              ))}
            </div>
          </div>
        )}
        {payment === "cod" && (
          <div className="border border-white/10 bg-white/[0.02] p-5 text-sm leading-relaxed text-white/60">
            <p className="font-display text-lg text-white">Pay when it arrives</p>
            <p className="mt-1.5">
              Keep <strong className="text-white">{thb(total)}</strong> ready for the rider. Free cancellation until the
              order ships.
            </p>
          </div>
        )}
        {err && <p className="text-sm text-white">{err}</p>}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.99 }}
          className="w-full rounded-full bg-white py-3 font-medium text-black transition hover:bg-white/90"
        >
          {payment === "cod" ? `Place order · ${thb(total)} on delivery` : `Pay ${thb(total)}`}
        </motion.button>
      </form>
      <Reveal delay={0.1} className="glass h-fit rounded-2xl p-6 text-sm">
        <h2 className="font-display text-2xl text-white">Summary</h2>
        {lines.map((l) => (
          <p key={l.slug} className="mt-2 flex justify-between text-white/65">
            <span>
              {l.p.title} × {l.qty}
            </span>
            <span>{thb(l.p.price * l.qty)}</span>
          </p>
        ))}
        <hr className="my-4 border-white/10" />
        <p className="flex justify-between">Subtotal {thb(sub)}</p>
        <p className="flex justify-between">Discount −{thb(disc + pVal + creditVal)}</p>
        <p className="flex justify-between">Delivery {thb(fee)}</p>
        <p className="mt-2 font-display text-2xl text-white">{thb(total)}</p>
      </Reveal>
    </main>
  );
}
