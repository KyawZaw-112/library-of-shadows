-- Run in Supabase SQL editor after schema.sql (anon cannot insert products).

insert into public.products
  (slug, sku, type, format, title, author, description, genre_slug, cover_url, price_thb, compare_at_thb, stock_qty, is_active)
values
  ('atomic-habits-campus','LOS-SD-001','book','physical','Atomic Habits (Campus Edition)','James Clear','Tiny systems for lecture halls.','self-development','from-[#3a1d12] to-[#1a0e18]',429,499,42,true),
  ('the-silent-patient','LOS-MY-002','book','physical','The Silent Patient','Alex Michaelides','A painter who stops speaking.','mystery','from-[#122033] to-[#0c0a12]',389,null,31,true),
  ('english-shadowing','LOS-EN-003','book','physical','Shadowing English at Midnight','L. Hart','Shadowing drills for campus talk.','english-learning','from-[#143326] to-[#0e1018]',349,null,54,true),
  ('letters-in-plum-ink','LOS-RO-004','book','physical','Letters in Plum Ink','Mira Solene','Two students, one archive.','romance','from-[#3a1528] to-[#120810]',359,null,27,true),
  ('deep-work-nights','LOS-SD-005','book','physical','Deep Work After Dusk','Cal Newport (annot.)','Focus rituals for noisy dorms.','self-development','from-[#1a2030] to-[#120810]',399,null,22,true),
  ('grammar-in-the-gloom','LOS-EN-006','book','physical','Grammar in the Gloom','N. Ellison','Tenses without fluorescent textbooks.','english-learning','from-[#102418] to-[#0a0c10]',299,null,60,true),
  ('the-guest-list','LOS-MY-007','book','physical','The Guest List','Lucy Foley','A wedding. Someone does not leave.','mystery','from-[#1a1228] to-[#08060c]',379,null,18,true),
  ('campus-theory','LOS-AC-008','book','physical','How to Survive Theory Class','A. Voss','Lit theory and the 23:59 essay.','academic','from-[#202428] to-[#0c0a10]',329,null,40,true),
  ('night-circus-notes','LOS-FI-009','book','physical','The Night Circus','Erin Morgenstern','Black-and-white tents.','fiction','from-[#2a1810] to-[#0c0810]',419,null,25,true),
  ('student-starter','LOS-BD-101','bundle','bundle','Student Starter Bundle','Library of Shadows','Two books, notebook, bookmark.','academic','from-[#2a1a10] to-[#1a1024]',799,980,15,true),
  ('self-dev-trio','LOS-BD-102','bundle','bundle','Self-Development Trio','Library of Shadows','Three curated spines.','self-development','from-[#241018] to-[#10182a]',999,1227,12,true),
  ('romance-thriller','LOS-BD-103','bundle','bundle','Romance / Thriller Night','Library of Shadows','One slow burn, one locked-room.','romance','from-[#1a1028] to-[#2a1218]',689,748,20,true)
on conflict (slug) do nothing;
