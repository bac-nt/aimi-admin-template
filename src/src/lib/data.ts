/**
 * Shared mock data & utilities used across pages
 */

// ─── Currency formatter ────────────────────────────────────────
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency,
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

export function formatDate(d: string | Date): string {
  return new Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'numeric' }).format(new Date(d))
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// ─── Products ─────────────────────────────────────────────────
export const PRODUCTS = [
  { id:1,  image:'https://picsum.photos/seed/p1/200/200', name:'Nike Air Max 270',           category:'Footwear',     brand:'Nike',    sku:'NK-AM-270',  price:129.99, original:159.99, stock:84,  status:'Active',   rating:4.5, reviews:128, img:'https://picsum.photos/seed/p1/200/200'  },
  { id:2,  name:'MacBook Air M3',              category:'Electronics',  brand:'Apple',   sku:'AP-MBA-M3',  price:1099.00,original:1299.00,stock:12,  status:'Active',   rating:4.9, reviews:342, img:'https://picsum.photos/seed/p2/200/200', image:'https://picsum.photos/seed/p2/200/200'  },
  { id:3,  name:'Sony WH-1000XM5',            category:'Electronics',  brand:'Sony',    sku:'SN-WH-1000', price:279.99, original:349.99, stock:37,  status:'Active',   rating:4.7, reviews:210, img:'https://picsum.photos/seed/p3/200/200', image:'https://picsum.photos/seed/p3/200/200'  },
  { id:4,  name:'Adidas Ultraboost 23',        category:'Footwear',     brand:'Adidas',  sku:'AD-UB-23',   price:159.99, original:189.99, stock:0,   status:'Inactive', rating:4.3, reviews:89,  img:'https://picsum.photos/seed/p4/200/200', image:'https://picsum.photos/seed/p4/200/200'  },
  { id:5,  name:'Organic Cotton T-Shirt',      category:'Clothing',     brand:'EcoWear', sku:'EW-OCT-01',  price:34.99,  original:44.99,  stock:210, status:'Active',   rating:4.2, reviews:56,  img:'https://picsum.photos/seed/p5/200/200', image:'https://picsum.photos/seed/p5/200/200'  },
  { id:6,  name:'Leather Crossbody Bag',       category:'Accessories',  brand:'Fossil',  sku:'FS-LCB-01',  price:89.99,  original:119.99, stock:44,  status:'Active',   rating:4.6, reviews:93,  img:'https://picsum.photos/seed/p6/200/200', image:'https://picsum.photos/seed/p6/200/200'  },
  { id:7,  name:'iPad Pro 12.9"',              category:'Electronics',  brand:'Apple',   sku:'AP-IPD-12',  price:1099.00,original:1199.00,stock:29,  status:'Active',   rating:4.8, reviews:184, img:'https://picsum.photos/seed/p7/200/200', image:'https://picsum.photos/seed/p7/200/200'  },
  { id:8,  name:'Wireless Mechanical Keyboard',category:'Electronics',  brand:'Keychron',sku:'KC-WMK-01',  price:129.99, original:149.99, stock:67,  status:'Active',   rating:4.4, reviews:142, img:'https://picsum.photos/seed/p8/200/200', image:'https://picsum.photos/seed/p8/200/200'  },
  { id:9,  name:'Running Shorts Pro',          category:'Clothing',     brand:'Nike',    sku:'NK-RSP-01',  price:49.99,  original:59.99,  stock:195, status:'Active',   rating:4.1, reviews:47,  img:'https://picsum.photos/seed/p9/200/200', image:'https://picsum.photos/seed/p9/200/200'  },
  { id:10, name:'Stainless Water Bottle',      category:'Accessories',  brand:'Hydro',   sku:'HF-SWB-32',  price:39.99,  original:49.99,  stock:320, status:'Active',   rating:4.5, reviews:278, img:'https://picsum.photos/seed/p10/200/200', image:'https://picsum.photos/seed/p10/200/200' },
  { id:11, name:'Yoga Mat Premium',            category:'Sports',       brand:'Lululemon',sku:'LL-YMP-01',  price:68.00,  original:88.00,  stock:76,  status:'Active',   rating:4.6, reviews:165, img:'https://picsum.photos/seed/p11/200/200', image:'https://picsum.photos/seed/p11/200/200' },
  { id:12, name:'Denim Jacket Vintage',        category:'Clothing',     brand:'Levi\'s', sku:'LV-DJV-01',  price:79.99,  original:99.99,  stock:0,   status:'Inactive', rating:4.0, reviews:31,  img:'https://picsum.photos/seed/p12/200/200', image:'https://picsum.photos/seed/p12/200/200' },
]

// ─── Categories ───────────────────────────────────────────────
export const ECOM_CATEGORIES = [
  { id:1, name:'Electronics',  slug:'electronics',  parent:null,        count:48, status:'Active',   icon:'💻' },
  { id:2, name:'Footwear',     slug:'footwear',      parent:null,        count:32, status:'Active',   icon:'👟' },
  { id:3, name:'Clothing',     slug:'clothing',      parent:null,        count:127,status:'Active',   icon:'👕' },
  { id:4, name:'Accessories',  slug:'accessories',   parent:null,        count:64, status:'Active',   icon:'👜' },
  { id:5, name:'Sports',       slug:'sports',        parent:null,        count:29, status:'Active',   icon:'⚽' },
  { id:6, name:'Smartphones',  slug:'smartphones',   parent:'Electronics',count:18, status:'Active',  icon:'📱' },
  { id:7, name:'Laptops',      slug:'laptops',       parent:'Electronics',count:12, status:'Active',  icon:'💻' },
  { id:8, name:'Running',      slug:'running',       parent:'Footwear',  count:14, status:'Active',   icon:'🏃' },
  { id:9, name:'Dresses',      slug:'dresses',       parent:'Clothing',  count:38, status:'Draft',    icon:'👗' },
  { id:10,name:'Watches',      slug:'watches',       parent:'Accessories',count:22,status:'Active',   icon:'⌚' },
]

// ─── Orders ───────────────────────────────────────────────────
export const ORDERS = [
  { id:'#ORD-7841', customer:'Sarah Johnson',   email:'sarah@email.com',   items:3, total:289.97, status:'Delivered',  date:'Mar 20, 2025', payment:'Visa ••4242',   city:'New York'     },
  { id:'#ORD-7840', customer:'Michael Chen',    email:'mchen@email.com',   items:1, total:1099.00,status:'Processing', date:'Mar 20, 2025', payment:'Mastercard',    city:'San Francisco'},
  { id:'#ORD-7839', customer:'Emma Wilson',     email:'ewilson@email.com', items:5, total:184.95, status:'Shipped',    date:'Mar 19, 2025', payment:'PayPal',        city:'Chicago'      },
  { id:'#ORD-7838', customer:'James Murphy',    email:'jmurphy@email.com', items:2, total:209.98, status:'Pending',    date:'Mar 19, 2025', payment:'Visa ••1234',   city:'Boston'       },
  { id:'#ORD-7837', customer:'Anna Rodriguez',  email:'anna@email.com',    items:1, total:68.00,  status:'Cancelled',  date:'Mar 18, 2025', payment:'Stripe',        city:'Miami'        },
  { id:'#ORD-7836', customer:'David Park',      email:'dpark@email.com',   items:4, total:399.96, status:'Delivered',  date:'Mar 18, 2025', payment:'Apple Pay',     city:'Seattle'      },
  { id:'#ORD-7835', customer:'Lisa Thompson',   email:'lisa@email.com',    items:2, total:159.98, status:'Delivered',  date:'Mar 17, 2025', payment:'Visa ••5678',   city:'Denver'       },
  { id:'#ORD-7834', customer:'Tom Williams',    email:'tomw@email.com',    items:6, total:522.94, status:'Processing', date:'Mar 17, 2025', payment:'Mastercard',    city:'Austin'       },
  { id:'#ORD-7833', customer:'Priya Sharma',    email:'priya@email.com',   items:1, total:279.99, status:'Shipped',    date:'Mar 16, 2025', payment:'PayPal',        city:'Houston'      },
  { id:'#ORD-7832', customer:'Chris Brown',     email:'cbrown@email.com',  items:3, total:139.97, status:'Delivered',  date:'Mar 16, 2025', payment:'Visa ••9012',   city:'Phoenix'      },
]

// ─── Customers ────────────────────────────────────────────────
export const CUSTOMERS = [
  { id:1,  name:'Sarah Johnson',   email:'sarah@email.com',   phone:'+1 555-0101', city:'New York',      orders:12, spent:1847.50,  status:'Active',    since:'Jan 2023', tier:'Gold'     },
  { id:2,  name:'Michael Chen',    email:'mchen@email.com',   phone:'+1 555-0102', city:'San Francisco', orders:8,  spent:3204.00,  status:'Active',    since:'Mar 2023', tier:'Platinum' },
  { id:3,  name:'Emma Wilson',     email:'ewilson@email.com', phone:'+1 555-0103', city:'Chicago',       orders:24, spent:892.40,   status:'Active',    since:'Nov 2022', tier:'Silver'   },
  { id:4,  name:'James Murphy',    email:'jmurphy@email.com', phone:'+1 555-0104', city:'Boston',        orders:3,  spent:419.97,   status:'Active',    since:'Feb 2024', tier:'Bronze'   },
  { id:5,  name:'Anna Rodriguez',  email:'anna@email.com',    phone:'+1 555-0105', city:'Miami',         orders:0,  spent:0,        status:'Inactive',  since:'Mar 2024', tier:'Bronze'   },
  { id:6,  name:'David Park',      email:'dpark@email.com',   phone:'+1 555-0106', city:'Seattle',       orders:19, spent:5621.80,  status:'Active',    since:'Jun 2022', tier:'Platinum' },
  { id:7,  name:'Lisa Thompson',   email:'lisa@email.com',    phone:'+1 555-0107', city:'Denver',        orders:7,  spent:678.86,   status:'Active',    since:'Aug 2023', tier:'Silver'   },
  { id:8,  name:'Tom Williams',    email:'tomw@email.com',    phone:'+1 555-0108', city:'Austin',        orders:31, spent:2341.12,  status:'Active',    since:'Apr 2022', tier:'Gold'     },
  { id:9,  name:'Priya Sharma',    email:'priya@email.com',   phone:'+1 555-0109', city:'Houston',       orders:5,  spent:979.95,   status:'Active',    since:'Dec 2023', tier:'Bronze'   },
  { id:10, name:'Chris Brown',     email:'cbrown@email.com',  phone:'+1 555-0110', city:'Phoenix',       orders:15, spent:1234.55,  status:'Suspended', since:'Sep 2023', tier:'Silver'   },
]

// ─── Reviews ──────────────────────────────────────────────────
export const REVIEWS = [
  { id:1,  product:'Nike Air Max 270',     customer:'Sarah J.',   rating:5, title:'Perfect fit!',            body:'Incredibly comfortable, great for all-day wear.',  status:'Approved', date:'Mar 15', helpful:24, verified:true  },
  { id:2,  product:'MacBook Air M3',       customer:'Michael C.', rating:5, title:'Best laptop ever',        body:'Blazing fast, incredible battery life.',           status:'Approved', date:'Mar 14', helpful:48, verified:true  },
  { id:3,  product:'Sony WH-1000XM5',      customer:'Emma W.',    rating:4, title:'Great ANC headphones',    body:'Sound quality is exceptional. ANC works perfectly.',status:'Approved', date:'Mar 13', helpful:18, verified:true  },
  { id:4,  product:'Adidas Ultraboost 23', customer:'James M.',   rating:2, title:'Sizing runs small',       body:'Had to return and size up. Not as expected.',       status:'Pending',  date:'Mar 12', helpful:7,  verified:false },
  { id:5,  product:'Organic Cotton Tee',   customer:'Anna R.',    rating:3, title:'Average quality',         body:'Fabric is decent but not exceptional.',             status:'Approved', date:'Mar 11', helpful:4,  verified:true  },
  { id:6,  product:'Leather Crossbody',    customer:'David P.',   rating:5, title:'Stunning bag!',           body:'Beautiful quality. Exactly as described.',          status:'Approved', date:'Mar 10', helpful:31, verified:true  },
  { id:7,  product:'iPad Pro 12.9"',       customer:'Lisa T.',    rating:5, title:'Worth every penny',       body:'Incredible for drawing and creative work.',         status:'Approved', date:'Mar 9',  helpful:42, verified:true  },
  { id:8,  product:'Keychron Keyboard',    customer:'Tom W.',     rating:1, title:'DOA unit',                body:'Dead on arrival. Keys not responding.',             status:'Pending',  date:'Mar 8',  helpful:15, verified:true  },
]

// ─── Coupons ──────────────────────────────────────────────────
export const COUPONS = [
  { id:1,  code:'SUMMER25',  type:'Percent',  value:25,  minOrder:50,   uses:142, limit:500,  status:'Active',   expires:'Jun 30, 2025' },
  { id:2,  code:'FLAT10',    type:'Fixed',    value:10,  minOrder:30,   uses:89,  limit:200,  status:'Active',   expires:'Apr 15, 2025' },
  { id:3,  code:'NEWUSER50', type:'Percent',  value:50,  minOrder:100,  uses:38,  limit:100,  status:'Active',   expires:'Dec 31, 2025' },
  { id:4,  code:'FREESHIP',  type:'Shipping', value:0,   minOrder:75,   uses:204, limit:1000, status:'Active',   expires:'Mar 31, 2025' },
  { id:5,  code:'FLASH20',   type:'Percent',  value:20,  minOrder:0,    uses:500, limit:500,  status:'Expired',  expires:'Feb 28, 2025' },
  { id:6,  code:'VIP100',    type:'Fixed',    value:100, minOrder:500,  uses:12,  limit:50,   status:'Active',   expires:'Dec 31, 2025' },
]

// ─── Blog data ─────────────────────────────────────────────────
export const BLOG_POSTS = [
  { id:1,  title:'Getting Started with Next.js 15',      cat:'Development', author:'Mathew',  date:'Jan 15, 2025', views:4200, likes:128, comments:24, status:'Published', img:'https://picsum.photos/seed/b1/400/240', tags:['nextjs','react'] },
  { id:2,  title:'Tailwind CSS Best Practices in 2025',  cat:'Design',      author:'Nirav',   date:'Jan 18, 2025', views:3100, likes:96,  comments:18, status:'Published', img:'https://picsum.photos/seed/b2/400/240', tags:['css','tailwind']  },
  { id:3,  title:'Building Scalable React Applications', cat:'Development', author:'Bhavesh', date:'Jan 22, 2025', views:5600, likes:210, comments:41, status:'Published', img:'https://picsum.photos/seed/b3/400/240', tags:['react','patterns'] },
  { id:4,  title:'UI/UX Design Trends 2025',             cat:'Design',      author:'Lara',    date:'Jan 25, 2025', views:2800, likes:87,  comments:15, status:'Draft',     img:'https://picsum.photos/seed/b4/400/240', tags:['design','ux']     },
  { id:5,  title:'TypeScript for React Developers',      cat:'Development', author:'Andrew',  date:'Jan 28, 2025', views:6100, likes:243, comments:52, status:'Published', img:'https://picsum.photos/seed/b5/400/240', tags:['typescript','react'] },
  { id:6,  title:'Docker & Kubernetes for Beginners',    cat:'DevOps',      author:'Sunil',   date:'Feb 1, 2025',  views:3900, likes:145, comments:33, status:'Published', img:'https://picsum.photos/seed/b6/400/240', tags:['docker','devops'] },
]

export const BLOG_CATEGORIES = [
  { id:1, name:'Development', slug:'development', count:24, color:'#5d87ff', parent:null  },
  { id:2, name:'Design',      slug:'design',      count:18, color:'#7c3aed', parent:null  },
  { id:3, name:'DevOps',      slug:'devops',      count:11, color:'#49beff', parent:null  },
  { id:4, name:'Tutorial',    slug:'tutorial',    count:32, color:'#ffae1f', parent:null  },
  { id:5, name:'News',        slug:'news',        count:9,  color:'#13deb9', parent:null  },
  { id:6, name:'React',       slug:'react',       count:15, color:'#5d87ff', parent:'Development' },
  { id:7, name:'CSS',         slug:'css',         count:8,  color:'#7c3aed', parent:'Design' },
]

export const BLOG_TAGS = [
  { id:1,  name:'nextjs',     slug:'nextjs',     count:12, trending:true  },
  { id:2,  name:'react',      slug:'react',      count:28, trending:true  },
  { id:3,  name:'typescript', slug:'typescript', count:19, trending:false },
  { id:4,  name:'tailwind',   slug:'tailwind',   count:14, trending:true  },
  { id:5,  name:'docker',     slug:'docker',     count:8,  trending:false },
  { id:6,  name:'css',        slug:'css',        count:11, trending:false },
  { id:7,  name:'devops',     slug:'devops',     count:6,  trending:false },
  { id:8,  name:'ux',         slug:'ux',         count:9,  trending:false },
  { id:9,  name:'api',        slug:'api',        count:7,  trending:false },
  { id:10, name:'performance',slug:'performance',count:5,  trending:true  },
]

// ─── Media ─────────────────────────────────────────────────────
export const MEDIA_FILES = [
  { id:1,  name:'hero-banner.jpg',       type:'image', size:'2.4 MB', dims:'1920×600', url:'https://picsum.photos/seed/m1/300/200',  date:'Mar 20' },
  { id:2,  name:'product-nike.png',      type:'image', size:'890 KB', dims:'800×800',  url:'https://picsum.photos/seed/m2/300/300',  date:'Mar 19' },
  { id:3,  name:'team-photo.jpg',        type:'image', size:'3.1 MB', dims:'2400×1600',url:'https://picsum.photos/seed/m3/300/200',  date:'Mar 18' },
  { id:4,  name:'blog-cover-1.jpg',      type:'image', size:'1.2 MB', dims:'1200×628', url:'https://picsum.photos/seed/m4/300/200',  date:'Mar 17' },
  { id:5,  name:'product-apple.png',     type:'image', size:'650 KB', dims:'600×600',  url:'https://picsum.photos/seed/m5/300/300',  date:'Mar 16' },
  { id:6,  name:'intro-video.mp4',       type:'video', size:'48 MB',  dims:'1920×1080',url:'',                                       date:'Mar 15' },
  { id:7,  name:'product-catalog.pdf',   type:'pdf',   size:'5.2 MB', dims:'—',        url:'',                                       date:'Mar 14' },
  { id:8,  name:'brand-logo.svg',        type:'image', size:'12 KB',  dims:'400×120',  url:'https://picsum.photos/seed/m8/300/100',  date:'Mar 13' },
  { id:9,  name:'icon-set.zip',          type:'zip',   size:'890 KB', dims:'—',        url:'',                                       date:'Mar 12' },
  { id:10, name:'favicon.ico',           type:'image', size:'4 KB',   dims:'32×32',    url:'https://picsum.photos/seed/m10/100/100', date:'Mar 11' },
  { id:11, name:'about-banner.jpg',      type:'image', size:'1.8 MB', dims:'1600×900', url:'https://picsum.photos/seed/m11/300/200', date:'Mar 10' },
  { id:12, name:'data-export.xlsx',      type:'excel', size:'320 KB', dims:'—',        url:'',                                       date:'Mar 9'  },
]
