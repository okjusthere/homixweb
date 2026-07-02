/**
 * Nassau County (Long Island) gated & private communities — facts layer.
 *
 * Scope: ALL-AGES, age-confirmed gated or private-HOA communities only.
 * 55+/age-restricted communities, and any whose age policy could not be
 * verified, are intentionally excluded. Every field is source-verified;
 * anything that could not be confirmed is omitted rather than guessed.
 * HOA dues are always treated as "varies by unit/model" in the UI. Buyer-facing
 * copy lives in `gated-community-content.ts`; this file is facts only.
 *
 * NOTE: this array is generated from a research + adversarial-verification pass
 * (see scratchpad/gen-communities.js); curate there, not by hand.
 */

export type GateType =
  | "guard-gated-24h"
  | "guard-gated-part-time"
  | "coded-gate"
  | "gated"
  | "private-no-gate"
  | "unverified";

export type CommunitySubRegion = "North Shore" | "Central Nassau" | "South Shore";

export interface CommunitySource {
  url: string;
  supports?: string;
}

export interface CommunityCommute {
  lirrStation?: string;
  lirrBranch?: string;
  minutesToManhattan?: string;
  drive?: string;
}

export interface GatedCommunity {
  slug: string;
  name: string;
  town: string;
  gov: string;
  subRegion: CommunitySubRegion;
  gateType: GateType;
  developer?: string;
  builtYear?: string;
  homesCount?: string;
  homeTypes?: string;
  hoaDues?: string;
  priceRange?: string;
  amenities: string[];
  commute: CommunityCommute;
  /** Typical annual property-tax range for homes in this community (bilingual). */
  propertyTax?: { en: string; zh: string };
  officialUrl?: string;
  sources: CommunitySource[];
  image?: string;
  gallery?: { src: string; caption?: string }[];
  confidence: "high" | "medium" | "low";
}

export const gatedCommunities: GatedCommunity[] = [
  {
    "slug": "stone-hill-north-hills",
    "name": "Stone Hill at North Hills",
    "town": "Manhasset",
    "gov": "North Hempstead",
    "subRegion": "North Shore",
    "gateType": "guard-gated-24h",
    "builtYear": "c. 1999",
    "homesCount": "~82",
    "homeTypes": "Single-family detached, 4,000+ sq ft on ~½-acre and larger lots",
    "priceRange": "~$3.65M–$5.2M",
    "amenities": [
      "Landscaping and snow removal",
      "Adjacent to North Hills Country Club / golf course",
      "24-hour manned guard gatehouse with security access",
      "Roving night security patrols",
      "Two community tennis courts",
      "Common-area landscaping and grounds maintenance",
      "Original Russell Page-designed estate gardens (former Kiluna Farm)",
      "Professional HOA management (Stone Hill Community Association, Inc.)",
      "Manhasset School District"
    ],
    "commute": {
      "lirrStation": "Manhasset",
      "lirrBranch": "Port Washington Branch",
      "minutesToManhattan": "~28-32 min to Penn Station",
      "drive": "Off LIE (I-495) Exit 36N / Shelter Rock Road"
    },
    "sources": [
      {
        "url": "https://en.wikipedia.org/wiki/North_Hills,_New_York"
      },
      {
        "url": "https://www.northhillsny.gov/about/village-history/"
      },
      {
        "url": "https://real-estate.longislandluxuryhomes.com/i/stone-hill-manhasset-ny"
      },
      {
        "url": "https://www.realestatehudsonvalleyny.com/nassau/Manhasset-Stone-Hill-real-estate/"
      },
      {
        "url": "http://www.suffolkexperts.com/2020/10/12/stone-hill-luxury-homes-at-manhasset-new-york-in-nassau-county/"
      },
      {
        "url": "https://activerain.com/blogsview/5580435/stone-hill-gated-luxury-home-community-in-manhasset-long-island"
      },
      {
        "url": "https://www.condoli.com/stone-hill-manhasset/"
      },
      {
        "url": "https://www.compass.com/listing/13-stone-hill-drive-manhasset-ny-11030/1096209326709476305/"
      },
      {
        "url": "https://www.rockethomes.com/homes/16-stone-hill-dr-n-manhasset-ny-11030"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/1253514/60-Stone-Hill-Dr-S-Manhasset-NY-11030/"
      },
      {
        "url": "https://www.neighborwho.com/Stone-Hill-Dr-Manhasset-NY-addresses/"
      },
      {
        "url": "https://www.zillow.com/homedetails/30-Stone-Hill-Dr-S-Manhasset-NY-11030/31077399_zpid/"
      },
      {
        "url": "https://www.commpropmgt.com/stone-hill-community-association-inc/"
      },
      {
        "url": "https://accreditedpm.com/stone-hill-manhasset-2/"
      },
      {
        "url": "https://www.pindell-wilson.com/portals/PindellWilson/docs/HOA/Stone%20Hill%20Estates.pdf"
      }
    ],
    "confidence": "high",
    "developer": "Developed by Edward Klar (late 1990s)",
    "propertyTax": {
      "en": "~$36,000-$70,000 / yr (most homes ~$40,000-$55,000)",
      "zh": "约 $36,000-$70,000 / 年（多数房屋约 $40,000-$55,000）"
    },
    "gallery": [
      {
        "src": "/communities/stone-hill-north-hills/aerial-drone-view-of-a-stone-hill-home-5.jpg",
        "caption": "Aerial / drone view of a Stone Hill home (58 Stone Hill Dr S, Manhasset) showing t… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/stone-hill-north-hills/high-res-aerial-exterior-of-58-stone-hil.jpg",
        "caption": "High-res aerial/exterior of 58 Stone Hill Drive S, Manhasset — front of the home w… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/stone-hill-north-hills/front-exterior-streetscape-of-a-stone-hi.jpg",
        "caption": "Front exterior / streetscape of a Stone Hill home (58 Stone Hill Dr S) — white-and… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/stone-hill-north-hills/rear-paver-patio-of-a-stone-hill-home-lo.jpg",
        "caption": "Rear paver patio of a Stone Hill home looking out over open green space toward the… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/stone-hill-north-hills/representative-stone-hill-estate-home-st.jpg",
        "caption": "Representative Stone Hill estate home — stately brick center-hall Colonial with co… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/stone-hill-north-hills/representative-stone-hill-streetscape-ho.jpg",
        "caption": "Representative Stone Hill streetscape home — gray colonial with two-car garage and… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/stone-hill-north-hills/stone-hill-area-luxury-home-with-private.jpg",
        "caption": "Stone Hill-area luxury home with private in-ground swimming pool (25 Shelter Rock… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/stone-hill-north-hills/gourmet-eat-in-kitchen-with-center-islan.jpg",
        "caption": "Gourmet eat-in kitchen with center island, custom cabinetry and marble flooring in… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/stone-hill-north-hills/interior-bright-sitting-room-upstairs-la.jpg",
        "caption": "Interior — bright sitting room / upstairs landing with crystal chandeliers and har… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/stone-hill-north-hills/primary-bedroom-suite-with-crown-molding.jpg",
        "caption": "Primary bedroom suite with crown molding and hardwood floors in a Stone Hill home · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/stone-hill-north-hills/formal-dining-area-off-the-kitchen-with-.jpg",
        "caption": "Formal dining area off the kitchen with bay windows overlooking the landscaped gro… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/stone-hill-north-hills/modern-architectural-home-listed-in-the-.jpg",
        "caption": "Modern/architectural home listed in the Stone Hill, Manhasset search (7 Folie Cour… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      }
    ],
    "image": "/communities/stone-hill-north-hills/aerial-drone-view-of-a-stone-hill-home-5.jpg"
  },
  {
    "slug": "gracewood-north-hills",
    "name": "Gracewood at North Hills",
    "town": "North Hills",
    "gov": "North Hempstead",
    "subRegion": "North Shore",
    "gateType": "guard-gated-24h",
    "builtYear": "1996",
    "homesCount": "141",
    "homeTypes": "Detached single-family estate homes (seven floor plans, full basements)",
    "hoaDues": "~$1,200–$1,675/mo",
    "priceRange": "~$3.0M–$3.8M",
    "amenities": [
      "Outdoor heated swimming pool",
      "Indoor swimming pool",
      "Tennis court",
      "Spa facilities",
      "Mansion Clubhouse (restored former Grace family mansion)",
      "24-hour manned gatehouse / gated security",
      "Sundeck",
      "Pickleball court",
      "State-of-the-art fitness center / gym",
      "Aerobics and yoga studio / classes",
      "Sauna and steam room",
      "Billiard room",
      "80+ acres of landscaped, park-like grounds"
    ],
    "commute": {
      "lirrStation": "Manhasset",
      "lirrBranch": "Port Washington Branch",
      "minutesToManhattan": "~28-32 min to Penn Station (estimate)",
      "drive": "Just off the LIE (I-495)/Northern State Parkway"
    },
    "officialUrl": "https://www.gracewoodnh.com/",
    "sources": [
      {
        "url": "https://www.gracewoodnh.com/"
      },
      {
        "url": "https://real-estate.longislandluxuryhomes.com/i/gracewood-at-north-hills-manhasset-ny"
      },
      {
        "url": "https://en.wikipedia.org/wiki/North_Hills,_New_York"
      },
      {
        "url": "https://www.condoli.com/condos/gracewood-manhasset/"
      },
      {
        "url": "https://gracewoodnorthhills.casamere.com/"
      },
      {
        "url": "https://www.compass.com/listing/21-gracewood-drive-manhasset-ny-11030/1847146646940104481/"
      },
      {
        "url": "https://www.gracewoodnh.com/p/Amenities"
      },
      {
        "url": "https://www.redfin.com/NY/Manhasset/11-Gracewood-Dr-11030/home/20571470"
      },
      {
        "url": "https://www.redfin.com/NY/Manhasset/35-Gracewood-Dr-11030/home/20569573"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/1253353/27-Gracewood-Dr-Manhasset-NY-11030/"
      },
      {
        "url": "https://www.compass.com/listing/17-gracewood-drive-manhasset-ny-11030/216556421544771425/"
      },
      {
        "url": "https://www.redfin.com/NY/Manhasset/33-Gracewood-Dr-11030/home/20569559"
      },
      {
        "url": "https://www.zillow.com/homedetails/33-Gracewood-Dr-Manhasset-NY-11030/31077254_zpid/"
      },
      {
        "url": "https://hoasrus.com/hoa-fees/new-york/manhasset/gracewood-at-north-hills-home-owners-association-inc"
      }
    ],
    "image": "/communities/gracewood-north-hills/gracewood-entrance-gatehouse-monument-th.jpg",
    "confidence": "high",
    "propertyTax": {
      "en": "~$34,000–$45,000 / yr",
      "zh": "约 $34,000–$45,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/gracewood-north-hills/gracewood-entrance-gatehouse-monument-th.jpg",
        "caption": "Gracewood entrance / gatehouse monument — the carved stone \"Gracewood\" community e… · Photo: public-files.hoa-express.com"
      },
      {
        "src": "/communities/gracewood-north-hills/the-mansion-clubhouse-present-day-color-.jpg",
        "caption": "The Mansion Clubhouse — present-day color photo of the restored white Grace family… · Photo: public-files.hoa-express.com"
      },
      {
        "src": "/communities/gracewood-north-hills/historic-aerial-of-the-original-grace-es.jpg",
        "caption": "Historic AERIAL of the original Grace estate mansion and its park-like grounds, tr… · Photo: public-files.hoa-express.com"
      },
      {
        "src": "/communities/gracewood-north-hills/historic-front-facade-of-the-grace-mansi.jpg",
        "caption": "Historic front facade of the Grace Mansion (now clubhouse) — grand columned/pedime… · Photo: public-files.hoa-express.com"
      },
      {
        "src": "/communities/gracewood-north-hills/historic-garden-terrace-of-the-grace-man.jpg",
        "caption": "Historic garden terrace of the Grace Mansion — brick rear elevation with striped a… · Photo: public-files.hoa-express.com"
      },
      {
        "src": "/communities/gracewood-north-hills/representative-gracewood-home-cream-clap.jpg",
        "caption": "Representative Gracewood home — cream clapboard estate-style single-family house w… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/gracewood-north-hills/representative-gracewood-home-and-street.jpg",
        "caption": "Representative Gracewood home and streetscape — gray-blue colonial with two-car ga… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/gracewood-north-hills/representative-gracewood-home-grey-two-s.jpg",
        "caption": "Representative Gracewood home — grey two-story colonial with landscaped front yard… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      }
    ]
  },
  {
    "slug": "manhasset-crest",
    "name": "Manhasset Crest",
    "town": "Manhasset",
    "gov": "North Hempstead",
    "subRegion": "North Shore",
    "gateType": "gated",
    "developer": "Toll Brothers",
    "builtYear": "2023",
    "homesCount": "46",
    "homeTypes": "New-construction single-family estates, up to ~4,780 sq ft",
    "priceRange": "from ~$2.99M",
    "amenities": [
      "Resort-style community clubhouse",
      "Social lounge",
      "Gated community with controlled access",
      "24-hour security",
      "Professionally maintained common areas & landscaping",
      "HOA-managed snow removal",
      "HOA-managed trash & common-area services",
      "On-site Toll Brothers Design Studio for home personalization"
    ],
    "commute": {
      "lirrStation": "Manhasset",
      "lirrBranch": "Port Washington Branch",
      "minutesToManhattan": "~28-32 min to Penn Station",
      "drive": "~19 miles to Midtown Manhattan"
    },
    "officialUrl": "https://www.tollbrothers.com/luxury-homes-for-sale/New-York/Manhasset-Crest",
    "sources": [
      {
        "url": "https://www.tollbrothers.com/luxury-homes-for-sale/New-York/Manhasset-Crest"
      },
      {
        "url": "https://www.globenewswire.com/news-release/2023/12/21/2800230/0/en/Toll-Brothers-Opens-Two-Luxury-Model-Homes-on-Long-Island-N-Y.html"
      },
      {
        "url": "https://patch.com/new-york/portwashington/manhasset-crest-46-new-luxury-homes-toll-brothers-opens-sales"
      },
      {
        "url": "https://en.wikipedia.org/wiki/Manhasset,_New_York"
      },
      {
        "url": "https://www.tollbrothers.com/blog/long-island-new-york-new-model-homes/"
      },
      {
        "url": "https://www.newhomesource.com/community/ny/manhasset/manhasset-crest-by-toll-brothers/183995"
      },
      {
        "url": "https://www.compass.com/homedetails/37-Sequoia-Cir-Manhasset-NY-11030/18KD7G_pid/"
      },
      {
        "url": "https://www.compass.com/homedetails/16-Sequoia-Cir-Manhasset-NY-11030/1ZYRRW_pid/"
      },
      {
        "url": "https://www.compass.com/homedetails/17-Sequoia-Cir-Manhasset-NY-11030/18RIHY_pid/"
      },
      {
        "url": "https://www.compass.com/listing/1-sequoia-circle-unit-1-manhasset-ny-11030/1347373523295436825/"
      },
      {
        "url": "https://www.redfin.com/NY/Manhasset/Manhasset-Crest/community/26309"
      },
      {
        "url": "https://www.ownwell.com/trends/new-york/nassau-county/manhasset"
      }
    ],
    "image": "/communities/manhasset-crest/aerial-skyline-location-image-used-by-to.jpg",
    "confidence": "high",
    "hoaDues": "~$400-$430 / mo",
    "propertyTax": {
      "en": "~$53,000-$60,000 / yr",
      "zh": "约 $53,000-$60,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/manhasset-crest/aerial-skyline-location-image-used-by-to.jpg",
        "caption": "Aerial/skyline location image used by Toll Brothers for Manhasset Crest — Manhatta… · Photo: cdn.tollbrothers.com"
      },
      {
        "src": "/communities/manhasset-crest/large-hero-exterior-of-the-hecksher-mode.jpg",
        "caption": "Large hero exterior of the Hecksher Modern Farmhouse home design at Manhasset Crest · Photo: cdn.tollbrothers.com"
      },
      {
        "src": "/communities/manhasset-crest/brady-model-interior-walkthrough-hero-sn.jpg",
        "caption": "Brady model interior/walkthrough hero snapshot at Manhasset Crest · Photo: cdn.tollbrothers.com"
      },
      {
        "src": "/communities/manhasset-crest/gatsby-model-home-outdoor-living-space-c.jpg",
        "caption": "Gatsby model home outdoor living space (covered patio / rear exterior) at Manhasse… · Photo: ml.globenewswire.com"
      },
      {
        "src": "/communities/manhasset-crest/interior-great-room-of-the-crawley-moder.jpg",
        "caption": "Interior — great room of the Crawley Modern Farmhouse model, representative of the… · Photo: cdn.tollbrothers.com"
      },
      {
        "src": "/communities/manhasset-crest/interior-primary-bedroom-crawley-modern-.jpg",
        "caption": "Interior — primary bedroom (Crawley Modern Farmhouse model). Source: Toll Brothers… · Photo: cdn.tollbrothers.com"
      },
      {
        "src": "/communities/manhasset-crest/interior-casual-dining-area-gatsby-model.jpg",
        "caption": "Interior — casual dining area, Gatsby model at Manhasset Crest · Photo: cdn.tollbrothers.com"
      },
      {
        "src": "/communities/manhasset-crest/interior-formal-dining-room-gatsby-model.jpg",
        "caption": "Interior — formal dining room, Gatsby model at Manhasset Crest. Source: Toll Broth… · Photo: cdn.tollbrothers.com"
      },
      {
        "src": "/communities/manhasset-crest/interior-finished-basement-entertaining-.jpg",
        "caption": "Interior — finished basement entertaining space, Gatsby model at Manhasset Crest.… · Photo: cdn.tollbrothers.com"
      },
      {
        "src": "/communities/manhasset-crest/toll-brothers-long-island-design-studio-.jpg",
        "caption": "Toll Brothers Long Island Design Studio · Photo: cdn.tollbrothers.com"
      }
    ]
  },
  {
    "slug": "stone-hill-muttontown",
    "name": "Stone Hill at Muttontown",
    "town": "Muttontown",
    "gov": "Oyster Bay",
    "subRegion": "North Shore",
    "gateType": "guard-gated-24h",
    "developer": "WB Kirby Hill (The Worrell Group / First Class Properties)",
    "homesCount": "80 homesites",
    "homeTypes": "Custom single-family estates on 1–2.5+ acre lots (~148 acres)",
    "priceRange": "~$3.4M–$4.0M",
    "amenities": [
      "Double-gated 24-hour manned gatehouse entrance",
      "Private clubhouse with gathering/card room",
      "Heated indoor swimming pool",
      "Private tennis facility",
      "HOA common areas plus deed-restricted open space",
      "State-of-the-art video camera surveillance system",
      "Top-of-the-line fitness center with locker rooms",
      "Over 29 acres of HOA-maintained common areas",
      "27+ acres of deed-restricted land kept in its natural state",
      "22 acres of additional deed-restricted open space on lots",
      "Equestrian trail encircling the community",
      "Professional landscape maintenance for individual estates",
      "Driveway snow removal included by the HOA",
      "Estate lots able to accommodate private pools, tennis courts and horse barns"
    ],
    "commute": {
      "lirrStation": "Syosset",
      "lirrBranch": "Port Jefferson Branch",
      "drive": "Village of Muttontown on Long Island's North Shore"
    },
    "officialUrl": "https://www.stonehillatmuttontown.com/",
    "sources": [
      {
        "url": "https://www.stonehillatmuttontown.com/about"
      },
      {
        "url": "https://www.stonehillatmuttontown.com/team"
      },
      {
        "url": "https://stonehillhoa.net/cgi-bin/aboutus.pl"
      },
      {
        "url": "https://www.newhomesource.com/community/ny/syosset/stonehill-at-muttontown-by-wb-kirby-hill/118781"
      },
      {
        "url": "https://www.muttontownny.gov/about/our-village/"
      },
      {
        "url": "https://en.wikipedia.org/wiki/Muttontown,_New_York"
      },
      {
        "url": "https://www.stonehillatmuttontown.com/"
      },
      {
        "url": "https://www.stonehillatmuttontown.com/amenities"
      },
      {
        "url": "https://www.redfin.com/NY/Syosset/75-Stone-Hill-Dr-11791/home/22670236"
      },
      {
        "url": "https://www.compass.com/listing/75-stone-hill-drive-muttontown-ny-11791/521601555378788505/"
      },
      {
        "url": "https://www.bhsusa.com/for-sale/new-york/muttontown/stone-hill-at-muttontown/1-kingwood-court-muttontown-ny-11791/L3422975-356846"
      },
      {
        "url": "https://www.compass.com/homes-for-sale/stone-hill-at-muttontown-syosset-ny/"
      },
      {
        "url": "https://www.zillow.com/muttontown-ny/stone-hill-at-muttontown_att/"
      },
      {
        "url": "https://stonehillhoa.net/"
      }
    ],
    "confidence": "high",
    "hoaDues": "~$989 / mo",
    "builtYear": "2005",
    "propertyTax": {
      "en": "~$35,000–$85,000 / yr",
      "zh": "约 $35,000–$85,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/stone-hill-muttontown/aerial-view-of-the-stone-hill-at-muttont.jpg",
        "caption": "Aerial view of the Stone Hill at Muttontown community — rolling estate home-sites,… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/stone-hill-muttontown/the-stone-hill-gatehouse-gated-entrance-.jpg",
        "caption": "The Stone Hill gatehouse / gated entrance with its signature serpentine stone wall… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/stone-hill-muttontown/second-view-of-the-old-world-gatehouse-e.jpg",
        "caption": "Second view of the old-world gatehouse / entry drive at Stone Hill at Muttontown (… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/stone-hill-muttontown/landscaped-water-feature-waterfall-ameni.jpg",
        "caption": "Landscaped water feature / waterfall amenity within the Stone Hill common grounds… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/stone-hill-muttontown/streetscape-street-design-within-stone-h.jpg",
        "caption": "Streetscape / street design within Stone Hill — manicured roadway, plantings and s… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/stone-hill-muttontown/community-master-plan-site-map-of-stone-.jpg",
        "caption": "Community master-plan / site map of Stone Hill at Muttontown showing the estate ho… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/stone-hill-muttontown/representative-stone-hill-estate-home-5-.jpg",
        "caption": "Representative Stone Hill estate home — 5 Westgate Road, Muttontown (Stone Hill at… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/stone-hill-muttontown/stone-hill-estate-home-5-buckingham-cour.jpg",
        "caption": "Stone Hill estate home — 5 Buckingham Court, Muttontown. MLS listing photo via the… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/stone-hill-muttontown/stone-hill-estate-home-11-buckingham-cou.jpg",
        "caption": "Stone Hill estate home — 11 Buckingham Court, Muttontown. Large brick/stone reside… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/stone-hill-muttontown/stone-hill-estate-home-9-earle-drive-mut.jpg",
        "caption": "Stone Hill estate home — 9 Earle Drive, Muttontown. MLS listing photo. ~393 KB. · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/stone-hill-muttontown/stone-hill-estate-home-2-buckingham-cour.jpg",
        "caption": "Stone Hill estate home — 2 Buckingham Court, Muttontown. Representative home/stree… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/stone-hill-muttontown/stone-hill-estate-home-2-earle-drive-mut.jpg",
        "caption": "Stone Hill estate home — 2 Earle Drive, Muttontown. Representative home exterior.… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      }
    ],
    "image": "/communities/stone-hill-muttontown/aerial-view-of-the-stone-hill-at-muttont.jpg"
  },
  {
    "slug": "spring-hill-old-westbury",
    "name": "Spring Hill at Old Westbury",
    "town": "Old Westbury",
    "gov": "North Hempstead",
    "subRegion": "North Shore",
    "gateType": "guard-gated-24h",
    "developer": "Kean Development",
    "homesCount": "~12 estate lots",
    "homeTypes": "Build-to-suit single-family estates on multi-acre lots",
    "priceRange": "Lots from ~$3.5M (build-to-suit)",
    "amenities": [
      "24-hour security with manned guard gate / gatehouse",
      "3-acre freshwater lake",
      "Gated, secluded private estate community",
      "160-acre historic former Phipps estate grounds",
      "Floating boat house on the lake for fishing and relaxation",
      "Mature trees, rolling meadowland and landscaped grounds",
      "Multi-acre build-to-suit estate lots (~4–9+ acres)",
      "Central location between New York City and the Hamptons",
      "Private estate amenities (build-to-suit; varies by home): indoor & outdoor pools, spa/sauna/steam room, tennis pavilion, home gym, golf simulator & par-3 hole, indoor basketball court, two-lane bowling alley, movie theater, billiards/sports bar/arcade, wine cellar"
    ],
    "commute": {
      "lirrStation": "Westbury",
      "lirrBranch": "Port Jefferson Branch",
      "minutesToManhattan": "~45-55 min by LIRR to Penn Station",
      "drive": "Developer markets ~22 min from Manhattan by car (off-peak)"
    },
    "officialUrl": "https://springhillatoldwestbury.com/",
    "sources": [
      {
        "url": "https://springhillatoldwestbury.com/"
      },
      {
        "url": "https://keandevelopment.com/portfolio/spring-hill-2/"
      },
      {
        "url": "https://springhillatoldwestbury.com/lake/"
      },
      {
        "url": "https://en.wikipedia.org/wiki/Old_Westbury,_New_York"
      },
      {
        "url": "https://ncvoa.org/nassau-county-villages/north-hempstead/village-of-old-westbury/"
      },
      {
        "url": "https://www.bhsusa.com/for-sale/new-york/old-westbury/12-spring-hill-lane-old-westbury-ny-11568/L3507480-293378"
      },
      {
        "url": "https://springhillatoldwestbury.com/portfolio/spring-hill-house/"
      },
      {
        "url": "https://springhillatoldwestbury.com/lot11/"
      },
      {
        "url": "https://www.zillow.com/homedetails/6-Spring-Hill-Ln-Old-Westbury-NY-11568/167457052_zpid/"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/69426718/6-Spring-Hill-Ln-Old-Westbury-NY-11568/"
      },
      {
        "url": "https://www.redfin.com/NY/Old-Westbury/6-Spring-Hill-Ln-11568/home/28900716"
      },
      {
        "url": "https://www.genstonerealty.com/property/784-L3507432-11-Spring-Hill-Lane-Old-Westbury-NY-11568/"
      },
      {
        "url": "https://www.priceypads.com/50m-john-kean-built-spring-ivy-estate-in-old-westbury-new-york/"
      },
      {
        "url": "https://www.priceypads.com/14-9m-furnished-stone-manor-by-kean-development-in-old-westbury-ny-photos/"
      },
      {
        "url": "https://www.longisland.com/articles/01-08-26/house-of-the-week-a-28m-all-season-resort-estate-behind-the-gates-of-old-westburys-spring-hill.html"
      }
    ],
    "image": "/communities/spring-hill-old-westbury/the-community-s-grand-wrought-iron-entra.jpg",
    "confidence": "high",
    "builtYear": "2013–present (build-to-suit; existing estates built ~2013 onward)",
    "propertyTax": {
      "en": "~$45,000–$180,000 / yr (most large completed estates ~$60,000–$130,000; the 25,000 sq ft flagship ~$107,000–$179,000 depending on assessment year)",
      "zh": "约 $45,000–$180,000 / 年（多数大型成屋约 $60,000–$130,000；2.5万平方英尺的旗舰庄园视评估年份约 $107,000–$179,000）"
    },
    "gallery": [
      {
        "src": "/communities/spring-hill-old-westbury/the-community-s-grand-wrought-iron-entra.jpg",
        "caption": "The community's grand wrought-iron entrance gate (ornate antique iron gate between… · Photo: springhillatoldwestbury.com"
      },
      {
        "src": "/communities/spring-hill-old-westbury/the-ornamental-iron-entrance-gate-closer.jpg",
        "caption": "The ornamental iron entrance gate, closer frontal view through the gate to the tre… · Photo: springhillatoldwestbury.com"
      },
      {
        "src": "/communities/spring-hill-old-westbury/spring-hill-entrance-gate-wide-view-of-t.jpg",
        "caption": "Spring Hill entrance gate — wide view of the decorative wrought-iron gate and ston… · Photo: keandevelopment.com"
      },
      {
        "src": "/communities/spring-hill-old-westbury/spring-hill-entrance-gate-alternate-angl.jpg",
        "caption": "Spring Hill entrance gate, alternate angle framed by mature trees with lush green… · Photo: keandevelopment.com"
      },
      {
        "src": "/communities/spring-hill-old-westbury/the-community-s-signature-amenity-the-wh.jpg",
        "caption": "The community's signature amenity: the white floating boathouse/pavilion on the 3-… · Photo: springhillatoldwestbury.com"
      },
      {
        "src": "/communities/spring-hill-old-westbury/the-floating-lake-pavilion-boathouse-wit.jpg",
        "caption": "The floating lake pavilion/boathouse with open-air seating area over the water, se… · Photo: springhillatoldwestbury.com"
      },
      {
        "src": "/communities/spring-hill-old-westbury/the-lakeside-floating-boathouse-with-cov.jpg",
        "caption": "The lakeside floating boathouse with covered lounge deck and connecting footbridge… · Photo: springhillatoldwestbury.com"
      },
      {
        "src": "/communities/spring-hill-old-westbury/wide-landscape-view-of-the-community-s-p.jpg",
        "caption": "Wide landscape view of the community's private lake with the boathouse at right, m… · Photo: springhillatoldwestbury.com"
      },
      {
        "src": "/communities/spring-hill-old-westbury/the-community-lake-and-white-columned-bo.jpg",
        "caption": "The community lake and white columned boathouse pavilion reflected in the water, s… · Photo: keandevelopment.com"
      },
      {
        "src": "/communities/spring-hill-old-westbury/elevated-aerial-style-view-looking-down-.jpg",
        "caption": "Elevated/aerial-style view looking down the dock toward the floating lake pavilion… · Photo: keandevelopment.com"
      },
      {
        "src": "/communities/spring-hill-old-westbury/inside-the-lake-pavilion-s-covered-loung.jpg",
        "caption": "Inside the lake pavilion's covered lounge — teak furniture with blue cushions and… · Photo: springhillatoldwestbury.com"
      },
      {
        "src": "/communities/spring-hill-old-westbury/lake-pavilion-lounge-deck-with-blue-and-.jpg",
        "caption": "Lake pavilion lounge deck with blue-and-white furnishings and 'SH' monogrammed pil… · Photo: springhillatoldwestbury.com"
      }
    ]
  },
  {
    "slug": "legend-yacht-beach-club",
    "name": "Legend Yacht & Beach Club",
    "town": "Glen Cove",
    "gov": "Glen Cove (city)",
    "subRegion": "North Shore",
    "gateType": "guard-gated-24h",
    "developer": "Spectrum Skanska",
    "builtYear": "2002",
    "homesCount": "47",
    "homeTypes": "Detached single-family homes on ~½-acre lots",
    "hoaDues": "~$2,450/mo",
    "priceRange": "~$1.58M–$2.6M",
    "amenities": [
      "24/7 manned/gated security with estate gated entrance and visitor announcement system",
      "Private sandy beach on Long Island Sound",
      "Owner clubhouse with water views, fireplace lounge, catering kitchen & wet bar, conference room, billiards, lending library",
      "Pond and nature walkways to the Sound",
      "Landscaping, irrigation, and snow removal included",
      "24/7/365 manned, gated estate entrance with visitor-announcement system",
      "Private marina with boat slips, water & electric hookups, and protective breakwater",
      "Kayaking and paddle-boarding from the marina",
      "Heated outdoor pool and pool terrace overlooking the marina",
      "Two-story owner clubhouse with water views and fireplace lounge",
      "Billiards and ping-pong tables",
      "Indoor heated multi-sport court (tennis, two pickleball courts, two badminton courts, basketball half-court, shuffleboard)",
      "Waterfront owners' patio overlooking Long Island Sound",
      "Ponds, garden areas, and nature walking paths to the Sound",
      "Community social events",
      "Proximity to Garvies Point boardwalk and planned NYC ferry service"
    ],
    "commute": {
      "lirrStation": "Glen Cove",
      "lirrBranch": "Oyster Bay Branch",
      "minutesToManhattan": "~64-78 min to Penn Station (often requires a transfer at Jamaica/Mineola)",
      "drive": "~25 miles to Midtown Manhattan"
    },
    "officialUrl": "https://www.legendglencove.com/",
    "sources": [
      {
        "url": "https://www.legendglencove.com/"
      },
      {
        "url": "https://www.compass.com/listing/28-pembroke-drive-unit-28-glen-cove-ny-11542/1395585417792377337/"
      },
      {
        "url": "https://real-estate.longislandluxuryhomes.com/i/legend-yacht--beach-club-glen-cove-ny"
      },
      {
        "url": "https://www.bhsusa.com/for-sale/new-york/glen-cove/legend-yachtbeach-club/17-pembroke-drive-glen-cove-ny-11542/L3543490-483872"
      },
      {
        "url": "https://www.legendglencove.com/about"
      },
      {
        "url": "https://www.legendglencove.com/services"
      },
      {
        "url": "https://www.neighborhoods.com/legend-yacht-and-beach-club-glen-cove-ny"
      },
      {
        "url": "https://www.thefreelibrary.com/Legend+Yacht+&+Beach+Club+opens+sales+in+Glen+Cove,+NY.-a059521555"
      },
      {
        "url": "https://www.redfin.com/NY/Glen-Cove/42-Pembroke-Dr-11542/home/20477931"
      },
      {
        "url": "https://www.remax.com/homes-for-sale/ny/glen-cove/legend-yacht-beach-club/neighborhood/1221048"
      }
    ],
    "confidence": "high",
    "propertyTax": {
      "en": "~$28,000–$45,000 / yr",
      "zh": "约 $28,000–$45,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/legend-yacht-beach-club/aerial-drone-view-of-the-full-legend-yac.jpg",
        "caption": "Aerial drone view of the full Legend Yacht & Beach Club community on its 46 waterf… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/legend-yacht-beach-club/aerial-drone-shot-from-the-water-showing.jpg",
        "caption": "Aerial drone shot from the water showing the community, marina and Long Island Sou… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/legend-yacht-beach-club/the-gated-security-entrance-gates-of-the.jpg",
        "caption": "The gated/security entrance gates of the community (24/7 guarded gatehouse communi… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/legend-yacht-beach-club/the-clubhouse-beach-club-building-with-w.jpg",
        "caption": "The clubhouse / beach club building with waterfront views · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/legend-yacht-beach-club/clubhouse-patio-deck-overlooking-long-is.jpg",
        "caption": "Clubhouse patio/deck overlooking Long Island Sound · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/legend-yacht-beach-club/the-heated-swimming-pool-and-patio-overl.jpg",
        "caption": "The heated swimming pool and patio overlooking the private marina · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/legend-yacht-beach-club/the-community-s-indoor-tennis-court-mult.jpg",
        "caption": "The community's indoor tennis court / multi-sport facility · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/legend-yacht-beach-club/the-private-marina-with-boat-slips-on-th.jpg",
        "caption": "The private marina with boat slips on the waterfront · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/legend-yacht-beach-club/landscaped-pond-and-nature-walking-groun.jpg",
        "caption": "Landscaped pond and nature/walking grounds within the gated community · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/legend-yacht-beach-club/nearby-garvies-point-waterfront-boardwal.jpg",
        "caption": "Nearby Garvies Point waterfront boardwalk · Photo: images.squarespace-cdn.com"
      }
    ],
    "image": "/communities/legend-yacht-beach-club/aerial-drone-view-of-the-full-legend-yac.jpg"
  },
  {
    "slug": "estates-north-hills-2",
    "name": "The Estates at North Hills II",
    "town": "North Hills",
    "gov": "North Hempstead",
    "subRegion": "North Shore",
    "gateType": "guard-gated-24h",
    "builtYear": "c. 1983",
    "homesCount": "178",
    "homeTypes": "Attached condos — ranch and 2-story townhouse plans, full basements",
    "priceRange": "~$2.3M–$3.6M",
    "amenities": [
      "24-hour manned guard-gated entrance",
      "Nighttime motorized security patrol",
      "Clubhouse with renovated great room and full kitchen",
      "Fitness center with men's and women's locker rooms",
      "Heated lifeguard-supervised outdoor swimming pool",
      "Pickleball courts",
      "Shaded patios",
      "Tennis courts (Har-Tru clay and hard courts)",
      "Landscaped grounds and common areas",
      "Resident social programming (brunches, barbecues, classes, celebrations)",
      "Reservable clubhouse for private parties"
    ],
    "commute": {
      "lirrStation": "Manhasset",
      "lirrBranch": "Port Washington Branch",
      "minutesToManhattan": "~33-40 min (estimated)",
      "drive": "Roughly 2.5 miles / ~9 min to Manhasset LIRR station"
    },
    "officialUrl": "https://www.estates2nh.com/",
    "sources": [
      {
        "url": "https://en.wikipedia.org/wiki/North_Hills,_New_York"
      },
      {
        "url": "https://ncvoa.org/nassau-county-villages/north-hempstead/village-of-north-hills/"
      },
      {
        "url": "https://www.estates2nh.com/"
      },
      {
        "url": "https://www.realestatehudsonvalleyny.com/nassau/estates-ii-manhasset/"
      },
      {
        "url": "https://www.suffolkexperts.com/2025/04/28/estates-1/"
      },
      {
        "url": "https://www.estates1nh.com/"
      },
      {
        "url": "https://www.compass.com/listing/23-estates-terrace-north-unit-23-manhasset-ny-11030/431747867108223009/"
      },
      {
        "url": "https://www.exprealty.com/estates-ii-condominium-manhasset-ny-real-estate/condos"
      },
      {
        "url": "https://www.redfin.com/NY/Manhasset/81-Estates-Ter-N-11030/home/20570752"
      },
      {
        "url": "https://www.ownwell.com/trends/new-york/nassau-county/manhasset"
      },
      {
        "url": "https://www.bhsusa.com/for-sale/new-york/manhasset/north-hills/estates-ii/23-estates-terrace-n-manhasset-ny-11030/880729-2798626"
      },
      {
        "url": "https://www.condoli.com/condos/estates-ii-mahasset/"
      }
    ],
    "image": "/communities/estates-north-hills-2/guard-gatehouse-and-gated-entrance-of-th.jpg",
    "confidence": "high",
    "hoaDues": "~$700-$1,200 / mo",
    "propertyTax": {
      "en": "~$18,000-$32,000 / yr",
      "zh": "约 $18,000-$32,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/estates-north-hills-2/guard-gatehouse-and-gated-entrance-of-th.jpg",
        "caption": "Guard gatehouse and gated entrance of The Estates at North Hills II, with the bric… · Photo: public-files.hoa-express.com"
      },
      {
        "src": "/communities/estates-north-hills-2/wider-view-of-the-community-entrance-dri.jpg",
        "caption": "Wider view of the community entrance drive curving up to the manned gatehouse, wit… · Photo: public-files.hoa-express.com"
      },
      {
        "src": "/communities/estates-north-hills-2/renovated-clubhouse-great-room-vaulted-w.jpg",
        "caption": "Renovated clubhouse great room — vaulted white truss ceiling, chandeliers, seating… · Photo: public-files.hoa-express.com"
      },
      {
        "src": "/communities/estates-north-hills-2/clubhouse-interior-dining-area-with-ston.jpg",
        "caption": "Clubhouse interior dining area with stone fireplace, wood floors and long communal… · Photo: public-files.hoa-express.com"
      },
      {
        "src": "/communities/estates-north-hills-2/outdoor-swimming-pool-patio-bluestone-de.jpg",
        "caption": "Outdoor swimming pool patio — bluestone deck with navy market umbrellas, café tabl… · Photo: public-files.hoa-express.com"
      },
      {
        "src": "/communities/estates-north-hills-2/tennis-pickleball-courts-framed-by-matur.jpg",
        "caption": "Tennis / pickleball courts framed by mature trees, with a landscaped paver walkway… · Photo: public-files.hoa-express.com"
      },
      {
        "src": "/communities/estates-north-hills-2/close-up-of-the-community-s-hard-tennis-.jpg",
        "caption": "Close-up of the community's hard tennis court with net and shaded courtside bench,… · Photo: public-files.hoa-express.com"
      }
    ]
  },
  {
    "slug": "links-north-hills",
    "name": "The Links at North Hills",
    "town": "North Hills (Roslyn)",
    "gov": "North Hempstead",
    "subRegion": "North Shore",
    "gateType": "guard-gated-24h",
    "builtYear": "1990s (expanded 2009)",
    "homesCount": "~212",
    "homeTypes": "Semi-attached, townhouse-style condominium residences",
    "priceRange": "~$1.45M–$2.57M",
    "amenities": [
      "Clubhouse with banquet hall and catering kitchen",
      "Indoor heated pool with hot tub",
      "Outdoor seasonal pool with patio",
      "Fitness center / gym",
      "Tennis courts",
      "Racquetball court",
      "24-hour manned guard gatehouse / gated security",
      "Fitness center with group classes",
      "Men's and women's saunas and steam rooms",
      "Pickleball courts",
      "Indoor/outdoor basketball court",
      "Card rooms and library / reading room",
      "Children's playground",
      "Walking paths and landscaped open green space",
      "Pond / water feature"
    ],
    "commute": {
      "lirrStation": "Manhasset",
      "lirrBranch": "Port Washington Branch",
      "minutesToManhattan": "~40 min typical to Penn Station / Grand Central via Port Washington Branch (branch-typical, not measured)",
      "drive": "~25 minutes to NYC per community write-ups"
    },
    "officialUrl": "https://www.linksatnorthhills.org/",
    "sources": [
      {
        "url": "https://en.wikipedia.org/wiki/North_Hills,_New_York"
      },
      {
        "url": "https://www.suffolkexperts.com/2022/10/30/the-links-gated-subdivision-north-hills-new-york/"
      },
      {
        "url": "https://www.casamere.com/ny/roslyn/the-links-at-north-hills/93"
      },
      {
        "url": "https://www.longislandhomesandcondos.com/links-north-hills/"
      },
      {
        "url": "https://www.compass.com/homes-for-sale/the-links-at-north-hills-roslyn-ny/"
      },
      {
        "url": "https://www.redfin.com/NY/Roslyn/421-Links-Dr-11576/unit-141/home/190095525"
      },
      {
        "url": "https://www.linksatnorthhills.org/"
      },
      {
        "url": "https://www.linksatnorthhills.org/p/Amenities"
      },
      {
        "url": "https://www.compass.com/homedetails/421-Links-Dr-Unit-141-North-Hills-NY-11576/18IOCY_pid/"
      },
      {
        "url": "https://www.redfin.com/NY/Roslyn/467-Links-Dr-S-11576/home/20548611"
      },
      {
        "url": "https://www.redfin.com/NY/Roslyn/462-Links-Dr-S-11576/home/20546838"
      },
      {
        "url": "https://www.redfin.com/NY/Roslyn/350-Baltustrol-Cir-11576/unit-350/home/184590910"
      },
      {
        "url": "https://www.zillow.com/homedetails/467-S-Links-Dr-North-Hills-NY-11576/2128306266_zpid/"
      }
    ],
    "image": "/communities/links-north-hills/official-hoa-site-banner-photo-the-commu.jpg",
    "confidence": "high",
    "hoaDues": "~$1,180–$1,400 / mo",
    "propertyTax": {
      "en": "~$29,000–$40,000 / yr",
      "zh": "约 $29,000–$40,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/links-north-hills/official-hoa-site-banner-photo-the-commu.jpg",
        "caption": "Official HOA site banner photo: the community's stone-and-flower entrance monument… · Photo: public-files.hoa-express.com"
      },
      {
        "src": "/communities/links-north-hills/the-community-clubhouse-gabled-clubhouse.jpg",
        "caption": "The community CLUBHOUSE — gabled clubhouse building with covered front porch, perg… · Photo: photos.prod.cirrussystem.net"
      },
      {
        "src": "/communities/links-north-hills/the-community-tennis-courts-green-hard-c.jpg",
        "caption": "The community TENNIS COURTS — green hard courts with nets, ringed by mature evergr… · Photo: photos.prod.cirrussystem.net"
      },
      {
        "src": "/communities/links-north-hills/representative-home-exterior-streetscape.jpg",
        "caption": "Representative home exterior / streetscape: a beige two-story townhome with attach… · Photo: photos.prod.cirrussystem.net"
      },
      {
        "src": "/communities/links-north-hills/representative-home-wide-front-side-elev.jpg",
        "caption": "Representative home — wide front/side elevation of a ranch-style attached home wit… · Photo: photos.prod.cirrussystem.net"
      },
      {
        "src": "/communities/links-north-hills/streetscape-of-attached-townhomes-with-a.jpg",
        "caption": "Streetscape of attached townhomes with a large open green common lawn in front — t… · Photo: photos.prod.cirrussystem.net"
      },
      {
        "src": "/communities/links-north-hills/entrance-gate-area-the-the-links-at-nort.jpg",
        "caption": "Entrance/gate area: the 'THE LINKS At North Hills' stone monument sign beside the… · Photo: photos.prod.cirrussystem.net"
      },
      {
        "src": "/communities/links-north-hills/open-landscaped-common-green-space-rolli.jpg",
        "caption": "Open landscaped common green space / rolling lawn with mature trees inside the 125… · Photo: photos.prod.cirrussystem.net"
      },
      {
        "src": "/communities/links-north-hills/private-rear-deck-of-a-home-overlooking-.jpg",
        "caption": "Private rear deck of a home overlooking the community's open green lawn and tree l… · Photo: photos.prod.cirrussystem.net"
      },
      {
        "src": "/communities/links-north-hills/interior-of-a-representative-home-full-b.jpg",
        "caption": "Interior of a representative home — full bathroom with double-sink vanity and glas… · Photo: photos.prod.cirrussystem.net"
      }
    ]
  },
  {
    "slug": "acorn-ponds",
    "name": "Acorn Ponds at North Hills",
    "town": "North Hills (Roslyn)",
    "gov": "North Hempstead",
    "subRegion": "North Shore",
    "gateType": "private-no-gate",
    "builtYear": "c. 1979–early 1980s",
    "homesCount": "382",
    "homeTypes": "Attached condominium townhomes, 2–3 bedrooms",
    "hoaDues": "~$580–$602/mo",
    "priceRange": "~$910K–$1.27M",
    "amenities": [
      "Indoor heated pool",
      "Fitness center / gym",
      "Sauna",
      "Steam room",
      "Three full tennis courts plus one tennis/pickleball court",
      "Gated community with 24-hour roaming security",
      "Grand clubhouse with event deck for community gatherings",
      "Outdoor heated pool with lap lanes",
      "Large gated outdoor park and children's playground",
      "Landscaped grounds with multiple ponds",
      "On-site property management",
      "Snow removal, trash, water/sewer and grounds maintenance included in common charges"
    ],
    "commute": {
      "lirrStation": "Manhasset",
      "lirrBranch": "Port Washington Branch",
      "minutesToManhattan": "~28-33 min to Penn Station (one-seat ride; unverified against official timetable)",
      "drive": "~20-22 miles to Midtown via LIE (I-495 Exit 35) / Northern State Pkwy"
    },
    "officialUrl": "https://www.acornpondscondo.com/",
    "sources": [
      {
        "url": "https://www.acornpondscondo.com/"
      },
      {
        "url": "https://activerain.com/blogsview/4357980/acorn-ponds-condo-at-north-hills-in-roslyn-long-island"
      },
      {
        "url": "https://www.compass.com/homes-for-sale/acorn-ponds-at-north-hills-roslyn-ny/"
      },
      {
        "url": "https://www.homes.com/building/acorn-ponds-condominium-roslyn-ny/b-wex2k8sl5681g/"
      },
      {
        "url": "https://www.redfin.com/NY/Roslyn/14-Acorn-Ponds-Dr-11576/unit-258/home/20553829"
      },
      {
        "url": "https://www.redfin.com/NY/Roslyn/24-Acorn-Ponds-Dr-11576/home/20553828"
      },
      {
        "url": "https://www.acornpondscondo.com/property-management/"
      },
      {
        "url": "https://www.redfin.com/neighborhood/322039/NY/North-Hills/Acorn-Ponds-at-North-Hills"
      },
      {
        "url": "https://www.redfin.com/NY/Roslyn/14-Acorn-Ponds-Dr-11576/home/20553829"
      },
      {
        "url": "https://www.redfin.com/NY/Roslyn/45-Acorn-Ponds-Dr-11576/home/20555853"
      },
      {
        "url": "https://www.zillow.com/roslyn-ny/acorn-ponds_att/"
      },
      {
        "url": "https://www.condoli.com/condos/acorn-ponds-roslyn/"
      },
      {
        "url": "https://www.bhsusa.com/for-sale/new-york/roslyn/north-hills/62-acorn-ponds-drive-276-roslyn-ny-11576/L3410585-393229"
      },
      {
        "url": "https://law.justia.com/cases/federal/district-courts/FSupp/623/688/1514014/"
      },
      {
        "url": "https://www.ownwell.com/trends/new-york/nassau-county/roslyn"
      }
    ],
    "confidence": "high",
    "developer": "Acorn Ponds at North Hills (APNH) — a development partnership organized in the mid-1970s; built in three condominium sections (APNH I, II, III)",
    "propertyTax": {
      "en": "~$11,000–$16,000 / yr (typically ~$13,000–$15,000)",
      "zh": "约 $11,000–$16,000 / 年（通常约 $13,000–$15,000）"
    },
    "gallery": [
      {
        "src": "/communities/acorn-ponds/outdoor-pool-the-large-outdoor-olympic-s.jpg",
        "caption": "Outdoor pool — the large outdoor/Olympic-sized swimming pool and deck area. Full-r… · Photo: acornpondscondo.com"
      },
      {
        "src": "/communities/acorn-ponds/outdoor-pool-alternate-view-poolside-dec.jpg",
        "caption": "Outdoor pool, alternate view (poolside / deck). Full-resolution from the official… · Photo: acornpondscondo.com"
      },
      {
        "src": "/communities/acorn-ponds/tennis-courts-at-acorn-ponds-har-tru-har.jpg",
        "caption": "Tennis courts at Acorn Ponds (Har-Tru / hard courts, also used for pickleball). Fu… · Photo: acornpondscondo.com"
      },
      {
        "src": "/communities/acorn-ponds/the-grand-clubhouse-building-houses-fitn.jpg",
        "caption": "The Grand Clubhouse building (houses fitness center, sauna, steam room, indoor poo… · Photo: acornpondscondo.com"
      },
      {
        "src": "/communities/acorn-ponds/fitness-center-gym-inside-the-clubhouse-.jpg",
        "caption": "Fitness center / gym inside the clubhouse · Photo: acornpondscondo.com"
      },
      {
        "src": "/communities/acorn-ponds/the-namesake-pond-beside-the-clubhouse-l.jpg",
        "caption": "The namesake pond beside the clubhouse — landscaped water feature within the commu… · Photo: acornpondscondo.com"
      },
      {
        "src": "/communities/acorn-ponds/community-streetscape-village-road-withi.jpg",
        "caption": "Community streetscape / village road within Acorn Ponds · Photo: acornpondscondo.com"
      },
      {
        "src": "/communities/acorn-ponds/community-playground-in-the-gated-park-a.jpg",
        "caption": "Community playground in the gated park area · Photo: acornpondscondo.com"
      },
      {
        "src": "/communities/acorn-ponds/lowell-h-kane-village-park-layout-park-p.jpg",
        "caption": "Lowell H. Kane Village Park layout / park & playground amenity · Photo: acornpondscondo.com"
      },
      {
        "src": "/communities/acorn-ponds/acorn-ponds-community-building-exterior-.jpg",
        "caption": "Acorn Ponds community / building exterior · Photo: suffolkexperts.com"
      }
    ],
    "image": "/communities/acorn-ponds/outdoor-pool-the-large-outdoor-olympic-s.jpg"
  },
  {
    "slug": "greens-north-hills",
    "name": "The Greens at North Hills",
    "town": "North Hills",
    "gov": "North Hempstead",
    "subRegion": "North Shore",
    "gateType": "private-no-gate",
    "builtYear": "c. 1980",
    "homeTypes": "Attached brick townhouse-style condominiums, 2–3 bedrooms",
    "hoaDues": "~$700/mo",
    "priceRange": "~$1.0M–$1.4M",
    "amenities": [
      "Community outdoor swimming pool",
      "Private tennis court(s)",
      "Adjacent to North Hills Country Club / golf course views",
      "Pet-friendly community",
      "Maintenance-free living (landscaping & grounds upkeep included)",
      "Attached garages (1–2 car)",
      "Full finished basements",
      "Central air conditioning",
      "Spacious private backyards / patios"
    ],
    "commute": {
      "lirrStation": "Manhasset",
      "lirrBranch": "Port Washington Branch",
      "minutesToManhattan": "~28 min to Penn Station",
      "drive": "Station ~2 mi / ~7 min"
    },
    "sources": [
      {
        "url": "https://en.wikipedia.org/wiki/North_Hills,_New_York"
      },
      {
        "url": "https://www.northhillsny.gov/"
      },
      {
        "url": "https://www.suffolkexperts.com/2019/10/24/the-greens-in-manhasset-new-york/"
      },
      {
        "url": "https://www.realestatehudsonvalleyny.com/nassau/manhasset-The-Greens-north-hills/"
      },
      {
        "url": "https://www.remax.com/homes-for-sale/ny/north-hills/the-greens-condominiums/neighborhood/667524"
      },
      {
        "url": "https://www.compass.com/homes-for-sale/the-greens-condominiums-manhasset-ny/"
      },
      {
        "url": "https://www.compass.com/listing/39-fairway-drive-unit-39-manhasset-ny-11030/1211697253527265097/"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/1266686/36-Fairway-Dr-Manhasset-NY-11030/"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/1266659/7-Fairway-Dr-Manhasset-NY-11030/"
      },
      {
        "url": "https://www.redfin.com/NY/Manhasset/44-Fairway-Dr-11030/unit-44/home/191480173"
      },
      {
        "url": "https://www.trulia.com/home/15-fairway-cir-s-15-manhasset-ny-11030-456580005"
      },
      {
        "url": "https://www.condoli.com/condos/the-green-manhasset/"
      }
    ],
    "confidence": "high",
    "propertyTax": {
      "en": "~$17,500–$24,000 / yr",
      "zh": "约 $17,500–$24,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/greens-north-hills/aerial-view-over-the-greens-at-north-hil.jpg",
        "caption": "Aerial view over The Greens at North Hills showing the community outdoor swimming… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/greens-north-hills/exterior-streetscape-of-a-greens-townhou.jpg",
        "caption": "Exterior/streetscape of a Greens townhouse at 227 Ibis Court, Manhasset · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/greens-north-hills/townhouse-exterior-at-211-hornbill-drive.jpg",
        "caption": "Townhouse exterior at 211 Hornbill Drive, Manhasset — representative Greens at Nor… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/greens-north-hills/front-exterior-of-33-fairway-drive-townh.jpg",
        "caption": "Front exterior of 33 Fairway Drive townhouse with garden and attached garage — The… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/greens-north-hills/front-exterior-with-landscaped-garden-34.jpg",
        "caption": "Front exterior with landscaped garden, 34 Fairway Drive — The Greens at North Hill… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/greens-north-hills/townhouse-exterior-at-2-fairway-drive-th.jpg",
        "caption": "Townhouse exterior at 2 Fairway Drive — The Greens at North Hills, Manhasset · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/greens-north-hills/exterior-view-of-16-fairway-circle-south.jpg",
        "caption": "Exterior view of 16 Fairway Circle South — renovated home in The Greens at North H… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/greens-north-hills/rear-exterior-of-42-fairway-drive-showin.jpg",
        "caption": "Rear exterior of 42 Fairway Drive showing private backyard and garden — The Greens… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/greens-north-hills/interior-living-space-of-227-ibis-court-.jpg",
        "caption": "Interior (living space) of 227 Ibis Court unit — The Greens at North Hills, showin… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/greens-north-hills/greens-area-townhouse-exterior-265-sparr.jpg",
        "caption": "Greens-area townhouse exterior, 265 Sparrow Drive, Manhasset · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/greens-north-hills/home-with-garden-landscaping-190-sussex-.jpg",
        "caption": "Home with garden/landscaping, 190 Sussex Drive, Manhasset — Greens at North Hills… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/greens-north-hills/onekey-mls-listing-photo-of-25-fairway-c.jpg",
        "caption": "OneKey MLS listing photo of 25 Fairway Circle S — townhouse in The Greens at North… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      }
    ],
    "image": "/communities/greens-north-hills/aerial-view-over-the-greens-at-north-hil.jpg"
  },
  {
    "slug": "whitewood-north-hills",
    "name": "Whitewood at North Hills",
    "town": "North Hills (Roslyn)",
    "gov": "North Hempstead",
    "subRegion": "North Shore",
    "gateType": "coded-gate",
    "homeTypes": "Attached ranch-style and 2-story townhouse residences",
    "priceRange": "~$875K–$1.4M (indicative)",
    "amenities": [
      "Pool house",
      "Tennis courts",
      "Community outdoor swimming pool",
      "Pickleball courts",
      "Coded/keypad security entry gate",
      "Gated, private community grounds",
      "Pet-friendly community",
      "Attached 2-car garages",
      "Full basements in residences",
      "Central air conditioning",
      "Herricks School District #9"
    ],
    "commute": {
      "lirrStation": "Manhasset (nearest practical station; residents drive to it)",
      "lirrBranch": "Port Washington Branch",
      "minutesToManhattan": "~30–45 min to Penn Station / Grand Central Madison (general North Hills guidance, not Whitewood-specific)",
      "drive": "~20–25 mi to Midtown Manhattan via LIE (I-495)"
    },
    "sources": [
      {
        "url": "https://en.wikipedia.org/wiki/North_Hills,_New_York"
      },
      {
        "url": "https://www.suffolkexperts.com/2025/04/24/whitewood-at-north-hills-gated-community-in-roslyn-new-york/"
      },
      {
        "url": "https://activerain.com/blogsview/5887700/whitewood-at-north-hills-gated-community-in-roslyn-long-island"
      },
      {
        "url": "https://www.compass.com/homes-for-sale/whitewood-condominiums-roslyn-ny/"
      },
      {
        "url": "https://www.laffey.com/s/ny/roslyn-city/whitewood-at-north-hills-subdivision"
      },
      {
        "url": "https://www.suffolkexperts.com/2016/01/28/whitewood-at-north-hills-condo-in-roslyn-ny-11576/"
      },
      {
        "url": "https://compass.com/listing/17-whitewood-drive-unit-21-roslyn-ny-11576/1344900728942821089"
      },
      {
        "url": "https://www.compass.com/homedetails/18-Whitewood-Dr-Roslyn-NY-11576/18MPCO_pid/"
      },
      {
        "url": "https://www.condoli.com/whitewood-roslyn/"
      },
      {
        "url": "https://www.zillow.com/homedetails/18-Whitewood-Dr-Roslyn-NY-11576/31092027_zpid/"
      }
    ],
    "confidence": "low",
    "hoaDues": "~$1,025 / mo",
    "builtYear": "1984",
    "propertyTax": {
      "en": "~$14,000–$20,000 / yr",
      "zh": "约 $14,000–$20,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/whitewood-north-hills/the-gated-vehicle-entrance-to-whitewood-.jpg",
        "caption": "The gated vehicle entrance to Whitewood at North Hills — stone gate pier, lantern,… · Photo: suffolkexperts.com"
      },
      {
        "src": "/communities/whitewood-north-hills/front-side-exterior-of-a-whitewood-home-.jpg",
        "caption": "Front/side exterior of a Whitewood home — brick multi-level townhouse-style reside… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/whitewood-north-hills/streetscape-of-attached-whitewood-reside.jpg",
        "caption": "Streetscape of attached Whitewood residences — row of brick townhomes with 2-car g… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      }
    ],
    "image": "/communities/whitewood-north-hills/the-gated-vehicle-entrance-to-whitewood-.jpg"
  },
  {
    "slug": "roslyn-landing",
    "name": "Roslyn Landing",
    "town": "Roslyn",
    "gov": "North Hempstead",
    "subRegion": "North Shore",
    "gateType": "private-no-gate",
    "developer": "The Ranches (G4 Capital; sales by Douglas Elliman)",
    "builtYear": "2016–2018",
    "homesCount": "78",
    "homeTypes": "Townhomes, flat-over-flat condos, and some single-family homes",
    "hoaDues": "~$998–$1,054/mo",
    "priceRange": "~$1.59M–$1.8M",
    "amenities": [
      "Golf simulator",
      "Children's indoor playroom",
      "Waterfront promenade along Hempstead Harbor",
      "Mobile on-site security",
      "Private clubhouse (social center) with concierge service",
      "Clubhouse lounge, dining area, and catering kitchen",
      "Billiards and bar/grill area",
      "State-of-the-art fitness center with Peloton bikes",
      "Individual and group personal training",
      "Red Door by Elizabeth Arden in-home/on-site spa services (manicures, pedicures, massages)",
      "Children's outdoor playground",
      "Two landscaped ponds",
      "House kayaks and paddleboards",
      "Community bicycles",
      "Outdoor barbecue / grill area",
      "Village green / Great Lawn and 12 acres of landscaped grounds",
      "Access to the village dog run",
      "Snow removal, refuse removal, and grounds/exterior maintenance",
      "Private elevators and two-car garages (in select residences)"
    ],
    "commute": {
      "lirrStation": "Roslyn",
      "lirrBranch": "Oyster Bay Branch",
      "minutesToManhattan": "~48 minutes to Penn Station (Manhattan)",
      "drive": "~30 miles east of Manhattan"
    },
    "officialUrl": "https://roslynlanding.com/",
    "sources": [
      {
        "url": "https://roslynlanding.com/"
      },
      {
        "url": "https://roslynlanding.com/team"
      },
      {
        "url": "https://www.longislandpress.com/here-comes-roslyn-landing/"
      },
      {
        "url": "https://roslyn-news.com/here-comes-roslyn-landing"
      },
      {
        "url": "https://www.longislandpress.com/2018/01/11/closings-underway-at-new-high-end-roslyn-landing/"
      },
      {
        "url": "https://nyrej.com/print/37706"
      },
      {
        "url": "https://roslynlanding.com/amenities"
      },
      {
        "url": "https://roslynlanding.com/site-plan"
      },
      {
        "url": "https://newyorklifestylesmagazine.com/articles/2017/04/55.html"
      },
      {
        "url": "https://www.luxuryrealestate.com/news/press_releases/9548"
      },
      {
        "url": "https://www.longislandpress.com/2015/11/24/here-comes-roslyn-landing/"
      },
      {
        "url": "https://www.coachrealtors.com/s/ny/roslyn-city/roslyn-landing-subdivision"
      },
      {
        "url": "https://www.redfin.com/NY/Roslyn/904-Mill-Crk-N-11576/unit-9-4/home/172712392"
      },
      {
        "url": "https://www.ownwell.com/trends/new-york/nassau-county/roslyn"
      },
      {
        "url": "https://www.nassaucountyny.gov/3364/Property-Taxes"
      },
      {
        "url": "https://lrv.nassaucountyny.gov/"
      }
    ],
    "confidence": "high",
    "propertyTax": {
      "en": "~$24,000–$38,000 / yr (estimated from Nassau County 11576 effective rate ~1.97% applied to community price range; varies by unit, exemptions, and grievance status)",
      "zh": "约 $24,000–$38,000 / 年（依据 Nassau 县 11576 邮编约 1.97% 的有效税率结合本社区价格区间估算；具体金额因户型、税务减免及税务申诉情况而异）"
    },
    "gallery": [
      {
        "src": "/communities/roslyn-landing/aerial-view-of-the-roslyn-landing-commun.jpg",
        "caption": "Aerial view of the Roslyn Landing community — professional drone photo showing the… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/roslyn-landing/aerial-view-of-roslyn-landing-2-overhead.jpg",
        "caption": "Aerial view of Roslyn Landing #2 — overhead shot of the community's rooflines, cou… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/roslyn-landing/aerial-view-of-roslyn-landing-3-bird-s-e.jpg",
        "caption": "Aerial view of Roslyn Landing #3 — bird's-eye view of the gated community and surr… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/roslyn-landing/aerial-view-of-roslyn-landing-4-high-ang.jpg",
        "caption": "Aerial view of Roslyn Landing #4 — high-angle photo of the full development showin… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/roslyn-landing/roslyn-landing-exterior-landscaped-great.jpg",
        "caption": "Roslyn Landing exterior — landscaped 'great lawn' / green space with the community… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/roslyn-landing/roslyn-landing-exterior-streetscape-prof.jpg",
        "caption": "Roslyn Landing exterior / streetscape — professionally photographed view of the to… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/roslyn-landing/representative-roslyn-landing-home-exter.jpg",
        "caption": "Representative Roslyn Landing home exterior — building facade and entrance in the… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/roslyn-landing/roslyn-landing-streetscape-row-of-townho.jpg",
        "caption": "Roslyn Landing streetscape — row of townhomes with driveways and landscaping along… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/roslyn-landing/roslyn-landing-building-exterior-home-fa.jpg",
        "caption": "Roslyn Landing building exterior — home facade / streetscape within the gated comm… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/roslyn-landing/roslyn-landing-exterior-grounds-communit.jpg",
        "caption": "Roslyn Landing exterior / grounds — community buildings with landscaped common are… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/roslyn-landing/roslyn-landing-exterior-townhome-buildin.jpg",
        "caption": "Roslyn Landing exterior — townhome building facades and entryways along a landscap… · Photo: images.squarespace-cdn.com"
      },
      {
        "src": "/communities/roslyn-landing/roslyn-landing-streetscape-view-down-a-c.jpg",
        "caption": "Roslyn Landing streetscape — view down a community street lined with the classic-s… · Photo: images.squarespace-cdn.com"
      }
    ],
    "image": "/communities/roslyn-landing/aerial-view-of-the-roslyn-landing-commun.jpg"
  },
  {
    "slug": "fieldstone-oyster-bay",
    "name": "Fieldstone",
    "town": "Oyster Bay",
    "gov": "Oyster Bay",
    "subRegion": "North Shore",
    "gateType": "private-no-gate",
    "builtYear": "1995",
    "homesCount": "40",
    "homeTypes": "Detached single-family homes, ~3,500 sq ft",
    "hoaDues": "~$595/mo",
    "priceRange": "~$950K–$1.61M",
    "amenities": [
      "Snow removal to the front door",
      "Lock-and-leave low-maintenance living",
      "HOA-maintained grounds and professional landscaping",
      "Garbage / trash pickup",
      "Private community on Fieldstone Lane (cul-de-sac setting)",
      "Minutes from Oyster Bay Harbor, beaches, and waterfront recreation",
      "Oyster Bay–East Norwich School District"
    ],
    "commute": {
      "lirrStation": "Oyster Bay",
      "lirrBranch": "Oyster Bay Branch (diesel/non-electric)",
      "minutesToManhattan": "approx. 90-100 min to Penn Station, typically transferring at Jamaica or Mineola",
      "drive": "North Shore of Nassau County"
    },
    "officialUrl": "https://fieldstone.casamere.com/",
    "sources": [
      {
        "url": "https://fieldstone.casamere.com/"
      },
      {
        "url": "https://www.neighborhoods.com/fieldstone-oyster-bay-ny"
      },
      {
        "url": "https://www.compass.com/listing/11-fieldstone-lane-oyster-bay-ny-11771/322457225741944177/"
      },
      {
        "url": "https://www.zillow.com/homedetails/29-Fieldstone-Ln-Oyster-Bay-NY-11771/31161071_zpid/"
      },
      {
        "url": "https://condoli.com/gated-hoas/"
      },
      {
        "url": "https://www.mta.info/schedules/lirr/oyster-bay"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/1300475/7-Fieldstone-Ln-Oyster-Bay-NY-11771/"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/1300461/35-Fieldstone-Ln-Oyster-Bay-NY-11771/"
      },
      {
        "url": "https://www.zillow.com/homedetails/7-Fieldstone-Ln-Oyster-Bay-NY-11771/31161086_zpid/"
      },
      {
        "url": "https://www.redfin.com/NY/Oyster-Bay/7-Fieldstone-Ln-11771/unit-FIELDSTONE/home/39611056"
      },
      {
        "url": "https://www.onekeymls.com/address/48-Fieldstone-Lane-Oyster-Bay-NY-11771/889071"
      },
      {
        "url": "https://longislandpropertytax.com/zip/11771"
      }
    ],
    "confidence": "high",
    "propertyTax": {
      "en": "~$17,000–$29,000 / yr",
      "zh": "约 $17,000–$29,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/fieldstone-oyster-bay/fieldstone-gated-entrance-gatehouse-offi.jpg",
        "caption": "Fieldstone gated entrance / gatehouse — official HOA rendering of the guard house,… · Photo: casamere-hoa.s3.amazonaws.com"
      },
      {
        "src": "/communities/fieldstone-oyster-bay/representative-fieldstone-home-front-ext.jpg",
        "caption": "Representative Fieldstone home — front exterior / streetscape of 38 Fieldstone Lan… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/fieldstone-oyster-bay/representative-fieldstone-home-front-ext-2.jpg",
        "caption": "Representative Fieldstone home — front exterior with sidewalk streetscape (red/blu… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/fieldstone-oyster-bay/fieldstone-home-exterior-blue-shingled-r.jpg",
        "caption": "Fieldstone home exterior — blue-shingled residence with landscaped front yard and… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/fieldstone-oyster-bay/fieldstone-home-rear-backyard-exterior-p.jpg",
        "caption": "Fieldstone home rear / backyard exterior — private lawn and patio behind a shingle… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/fieldstone-oyster-bay/fieldstone-community-grounds-open-green-.jpg",
        "caption": "Fieldstone community grounds — open green common lawn / parkland ringed by mature… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/fieldstone-oyster-bay/fieldstone-interior-streetscape-quiet-tr.jpg",
        "caption": "Fieldstone interior streetscape — quiet tree-lined community road curving through… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/fieldstone-oyster-bay/aerial-view-of-a-fieldstone-lane-home-an.jpg",
        "caption": "Aerial view of a Fieldstone Lane home and its expansive lawn/grounds among mature… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/fieldstone-oyster-bay/fieldstone-home-streetscape-38-fieldston.jpg",
        "caption": "Fieldstone home streetscape — 38 Fieldstone Lane seen from the community street, s… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/fieldstone-oyster-bay/fieldstone-home-exterior-detail-front-el.jpg",
        "caption": "Fieldstone home exterior detail — front elevation of 38 Fieldstone Lane with entry… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/fieldstone-oyster-bay/fieldstone-home-interior-two-story-great.jpg",
        "caption": "Fieldstone home interior — two-story great room with vaulted ceiling, fireplace an… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/fieldstone-oyster-bay/fieldstone-location-lifestyle-nearby-oys.jpg",
        "caption": "Fieldstone location / lifestyle — nearby Oyster Bay Harbor waterfront with boat la… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      }
    ],
    "image": "/communities/fieldstone-oyster-bay/fieldstone-gated-entrance-gatehouse-offi.jpg"
  },
  {
    "slug": "lattingtown-preserve",
    "name": "Lattingtown Preserve",
    "town": "Locust Valley",
    "gov": "Glen Cove (city)",
    "subRegion": "North Shore",
    "gateType": "gated",
    "builtYear": "1999",
    "homesCount": "~20",
    "homeTypes": "Single-family colonials in a woodland-preserve setting",
    "hoaDues": "~$510–$690/mo",
    "priceRange": "~$1.24M–$1.7M",
    "amenities": [
      "Private gated community",
      "HOA-maintained community",
      "Many individual homes have private in-ground pools",
      "Set within/adjacent to preserved woodlands",
      "Gatehouse / controlled gated entry",
      "HOA-maintained common grounds & landscaping",
      "Quiet cul-de-sac streets (Tappanwood Drive)",
      "Lawn sprinkler / irrigation systems",
      "Resident access to Glen Cove beaches (Morgan Park, Crescent Beach, Pryibil Beach)",
      "Resident access to the 18-hole Glen Cove Municipal Golf Course"
    ],
    "commute": {
      "lirrStation": "Locust Valley",
      "lirrBranch": "Oyster Bay Branch",
      "minutesToManhattan": "~60-75 min to Penn Station (diesel line; typically requires transfer at Jamaica or Mineola)",
      "drive": "~30-35 miles to Midtown Manhattan"
    },
    "sources": [
      {
        "url": "https://www.propertyshark.com/mason/Property/1508451/11-Tappanwood-Dr-Locust-Valley-NY-11560/"
      },
      {
        "url": "http://real-estate.longislandluxuryhomes.com/i/lattingtown-preserve-glen-cove-ny"
      },
      {
        "url": "https://www.neighborhoods.com/lattingtown-preserve-locust-valley-ny"
      },
      {
        "url": "https://www.stessa.com/investment-properties/9-tappanwood-dr-locust-valley-ny-11560/details/3bF7sd1frxPN"
      },
      {
        "url": "https://www.compass.com/homedetails/9-Tappanwood-Dr-Locust-Valley-NY-11560/18UI91_pid/"
      },
      {
        "url": "https://www.danielgale.com/listing/3-tappanwood-drive-locust-valley-ny-11560/dgid26951/"
      },
      {
        "url": "https://www.thesilkbridgeteam.com/sold-listing/detail/1187574035/9-Tappanwood-DR-Locust-Valley-NY"
      },
      {
        "url": "https://www.homes.com/property/3-tappanwood-dr-locust-valley-ny/prc5k64fbnw10/"
      },
      {
        "url": "https://www.redfin.com/NY/Locust-Valley/14-Tappanwood-Dr-11560/home/20478477"
      },
      {
        "url": "https://www.zillow.com/homedetails/2-Tappanwood-Dr-Lattingtown-NY-11560/31168436_zpid/"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/1508447/5-Tappanwood-Dr-Locust-Valley-NY-11560/"
      },
      {
        "url": "https://www.danielgale.com/listing-mlsli_sold/3135750-3-tappanwood-drive-locust-valley-ny-11560/"
      }
    ],
    "confidence": "high",
    "propertyTax": {
      "en": "~$22,000–$32,000 / yr",
      "zh": "约 $22,000–$32,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/lattingtown-preserve/wide-aerial-hero-shot-over-the-community.jpg",
        "caption": "Wide aerial hero shot over the community's private beach and beachfront clubhouse… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-preserve/aerial-of-the-two-story-beachfront-commu.jpg",
        "caption": "Aerial of the two-story beachfront community clubhouse (wraparound porches, kayak/… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-preserve/covered-clubhouse-porch-terrace-overlook.jpg",
        "caption": "Covered clubhouse/porch terrace overlooking the beach and open water of Long Islan… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-preserve/the-community-s-private-sandy-beach-on-l.jpg",
        "caption": "The community's private sandy beach on Long Island Sound with a protective rock je… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-preserve/beach-watersports-amenity-community-kaya.jpg",
        "caption": "Beach watersports amenity: community kayak/paddleboard racks and storage on the pr… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-preserve/representative-home-in-the-community-fro.jpg",
        "caption": "Representative home in the community — front exterior of a shingle/Tudor-style res… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-preserve/parklike-community-streetscape-expansive.jpg",
        "caption": "Parklike community streetscape: expansive lawns and mature trees with homes set ba… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-preserve/wooded-private-driveway-entry-lane-windi.jpg",
        "caption": "Wooded private driveway/entry lane winding through mature evergreens and flowering… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-preserve/carriage-house-style-multi-bay-garage-wi.jpg",
        "caption": "Carriage-house style multi-bay garage with upper balcony — representative outbuild… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-preserve/backyard-recreation-private-sport-basket.jpg",
        "caption": "Backyard recreation: private sport/basketball court with adjacent patio, outdoor d… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-preserve/representative-home-interior-vaulted-upp.jpg",
        "caption": "Representative home interior — vaulted upper-level bedroom/flex room with shiplap… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-preserve/representative-home-interior-large-light.jpg",
        "caption": "Representative home interior — large light-filled room with cathedral ceiling, exp… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      }
    ],
    "image": "/communities/lattingtown-preserve/wide-aerial-hero-shot-over-the-community.jpg"
  },
  {
    "slug": "hamlet-olde-oyster-bay",
    "name": "The Hamlet at Olde Oyster Bay",
    "town": "Plainview",
    "gov": "Oyster Bay",
    "subRegion": "Central Nassau",
    "gateType": "guard-gated-24h",
    "builtYear": "2001",
    "homesCount": "~141",
    "homeTypes": "Single-family homes, lake-view villas, and carriage-house condos",
    "hoaDues": "~$540–$755/mo (+ ~$165/mo dining fee)",
    "priceRange": "~$875K–$1.4M",
    "amenities": [
      "24-hour manned gatehouse / guard-gated security",
      "Indoor and outdoor pools",
      "Lighted tennis courts",
      "Pickleball courts",
      "Basketball half court",
      "Concierge & valet service",
      "Clubhouse with grand ballroom & banquet/catering facilities",
      "Waterfront restaurant",
      "Outdoor (lake-view) pool",
      "Kiddie / children's pool",
      "Spa & fitness center (Island Spa & Fitness)",
      "Saunas, steam rooms & whirlpools / hot tubs",
      "Sundecks",
      "Putting green",
      "Lake with boardwalk & boating (rowboats / paddleboats)",
      "Teen lounge / game room & card rooms",
      "Children's playground / play area",
      "EV charging stations",
      "Grounds & common-area maintenance",
      "Pet-friendly community"
    ],
    "commute": {
      "lirrStation": "Hicksville",
      "lirrBranch": "Main Line / Port Jefferson Branch",
      "minutesToManhattan": "~41–55 min to Penn Station",
      "drive": "Hicksville LIRR station ~3.4 mi / ~6 min from Plainview"
    },
    "officialUrl": "https://www.thehamletoysterbay.com/",
    "sources": [
      {
        "url": "https://www.thehamletoysterbay.com/"
      },
      {
        "url": "https://www.longislandhomesandcondos.com/hamlet-olde-oyster-bay-plainview-ny/"
      },
      {
        "url": "https://activerain.com/blogsview/5365469/the-hamlet-plainview-long-island-homes--villas--carriage-home"
      },
      {
        "url": "https://www.condoli.com/condos/the-hamlet-on-olde-oyster-bay-plainview/"
      },
      {
        "url": "https://real-estate.longislandluxuryhomes.com/i/the-hamlet-on-olde-oyster-bay-plainview-ny"
      },
      {
        "url": "https://www.laffey.com/s/ny/nassau-county/hamlet-at-olde-oyster-bay-(plainview)-subdivision"
      },
      {
        "url": "https://www.zillow.com/plainview-ny/hamlet-on-olde-oyster-bay_att/"
      },
      {
        "url": "https://www.zillow.com/b/hamlet-olde-oyster-bay-plainview-ny-5fTqDH/"
      },
      {
        "url": "https://www.redfin.com/neighborhood/501460/NY/Plainview/The-Hamlet-on-Olde-Oyster-Bay/pending-listings"
      },
      {
        "url": "https://www.remax.com/homes-for-sale/ny/plainview/the-hamlet-on-olde-oyster-bay/neighborhood/1030669"
      },
      {
        "url": "https://www.neighborhoods.com/hamlet-on-olde-oyster-bay-plainview-ny"
      },
      {
        "url": "https://hoa-community.com/hamlet-olde-oyster-bay-hoa-plainview-ny/"
      }
    ],
    "image": "/communities/hamlet-olde-oyster-bay/representative-home-at-11-bayview-drive-.jpg",
    "confidence": "high",
    "propertyTax": {
      "en": "~$16,000–$28,000 / yr (Nassau County; ~$16,300 avg per 2018 MLS records, higher for larger single-family homes)",
      "zh": "约 $16,000–$28,000 / 年（拿骚县；据 2018 年 MLS 记录平均约 $16,300，大型独栋住宅更高）"
    },
    "gallery": [
      {
        "src": "/communities/hamlet-olde-oyster-bay/representative-home-at-11-bayview-drive-.jpg",
        "caption": "Representative home at 11 Bayview Drive — two-story residence with light siding an… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-olde-oyster-bay/home-streetscape-at-173-sagamore-drive-l.jpg",
        "caption": "Home/streetscape at 173 Sagamore Drive. Large full-resolution image · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-olde-oyster-bay/home-streetscape-at-108-sagamore-drive-f.jpg",
        "caption": "Home/streetscape at 108 Sagamore Drive. Full-resolution image · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      }
    ]
  },
  {
    "slug": "hamlet-estates-jericho",
    "name": "The Hamlet Estates at Jericho",
    "town": "Jericho",
    "gov": "Oyster Bay",
    "subRegion": "Central Nassau",
    "gateType": "guard-gated-24h",
    "homesCount": "102",
    "homeTypes": "Detached single-family estates and villas, ~3,000–4,800 sq ft",
    "hoaDues": "~$1,000–$1,025/mo",
    "priceRange": "~$1.35M–$3.25M",
    "amenities": [
      "24-hour gated security / guard gate",
      "Clubhouse",
      "Fitness center",
      "Lounge",
      "Card room",
      "Outdoor swimming pool",
      "Children's/kiddie pool",
      "Whirlpool/spa",
      "24-hour guard-gated security / manned gatehouse",
      "Illuminated all-weather tennis courts",
      "Basketball half-court",
      "EV charging stations",
      "Grounds & common-area maintenance",
      "Snow removal",
      "Trash / refuse service"
    ],
    "commute": {
      "lirrStation": "Hicksville",
      "lirrBranch": "Main Line (Ronkonkoma/Port Jefferson/Oyster Bay branch service)",
      "minutesToManhattan": "~42-47 min to Penn Station (direct)",
      "drive": "~29 miles east of Midtown Manhattan"
    },
    "officialUrl": "https://www.hamletestatesjericho.com/",
    "sources": [
      {
        "url": "https://www.hamletestatesjericho.com/"
      },
      {
        "url": "https://www.nassaucountyny.gov/DocumentCenter/View/8783/jeric"
      },
      {
        "url": "https://en.wikipedia.org/wiki/Jericho,_New_York"
      },
      {
        "url": "https://www.suffolkexperts.com/2023/11/30/the-hamlet-estates-luxury-homes-in-jericho-new-york/"
      },
      {
        "url": "https://activerain.com/blogsview/5808395/the-gated-hamlet-estates-at-jericho-long-island-luxury-living"
      },
      {
        "url": "https://www.neighborhoods.com/the-hamlet-estates-at-jericho-jericho-ny"
      },
      {
        "url": "https://www.suffolkexperts.com/2016/04/24/the-hamlet-estates-in-jericho-ny-long-island-luxury-neighborhood/"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/25783116/11-Olde-Hamlet-Dr-Jericho-NY-11753/"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/25783121/23-Olde-Hamlet-Dr-Jericho-NY-11753/"
      },
      {
        "url": "https://www.redfin.com/NY/Jericho/11-Olde-Hamlet-Dr-11753/home/20217629"
      },
      {
        "url": "https://www.compass.com/homes-for-sale/the-hamlet-estates-jericho-ny/"
      }
    ],
    "confidence": "high",
    "builtYear": "2006 (estate homes built ~2006–2008)",
    "propertyTax": {
      "en": "~$30,000–$55,000 / yr (Nassau County; e.g., 23 Olde Hamlet Dr ~$43,895/yr, 11 Olde Hamlet Dr ~$45,648/yr for 2026)",
      "zh": "约 $30,000–$55,000 / 年（拿骚县房产税偏高；例如 23 Olde Hamlet Dr 约 $43,895/年、11 Olde Hamlet Dr 约 $45,648/年，2026 税年）"
    },
    "gallery": [
      {
        "src": "/communities/hamlet-estates-jericho/home-at-1-olde-hamlet-drive-welcome-entr.jpg",
        "caption": "Home at 1 Olde Hamlet Drive — welcome/entrance shot of a home just inside the gate… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-estates-jericho/estate-home-streetscape-at-20-kettlepond.jpg",
        "caption": "Estate home / streetscape at 20 Kettlepond Road, The Hamlet Estates at Jericho · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-estates-jericho/estate-home-exterior-at-3-olde-hamlet-dr.jpg",
        "caption": "Estate home exterior at 3 Olde Hamlet Drive (official HOA site). Large hero image · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-estates-jericho/estate-home-front-elevation-at-50-holida.jpg",
        "caption": "Estate home / front elevation at 50 Holiday Pond Road · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-estates-jericho/estate-home-exterior-at-53-kettlepond-ro.jpg",
        "caption": "Estate home exterior at 53 Kettlepond Road · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-estates-jericho/home-streetscape-at-17-olde-hamlet-drive.jpg",
        "caption": "Home / streetscape at 17 Olde Hamlet Drive · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-estates-jericho/home-at-36-kettlepond-road-official-hoa-.jpg",
        "caption": "Home at 36 Kettlepond Road · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      }
    ],
    "image": "/communities/hamlet-estates-jericho/home-at-1-olde-hamlet-drive-welcome-entr.jpg"
  },
  {
    "slug": "hamlet-jericho",
    "name": "The Hamlet at Jericho",
    "town": "Jericho",
    "gov": "Oyster Bay",
    "subRegion": "Central Nassau",
    "gateType": "guard-gated-24h",
    "builtYear": "from 1982",
    "homesCount": "386",
    "homeTypes": "Condominiums and townhomes across three sections",
    "hoaDues": "~$660–$1,507/mo",
    "priceRange": "~$1.0M–$1.6M",
    "amenities": [
      "Two pool sites",
      "Playground",
      "Walking trail",
      "24-hour gated security",
      "Two clubhouses (main clubhouse + west clubhouse)",
      "Main clubhouse heated pool, deep-water pool, and heated kiddie pool",
      "Heated pool at the west clubhouse",
      "Tennis courts (8, also described as 7 plus 2 pickleball courts)",
      "Basketball court",
      "State-of-the-art fitness center",
      "Clubhouse card rooms",
      "TV lounge",
      "Library",
      "Conference room",
      "Party / event room",
      "Home offices and mail rooms",
      "Social committee / community activities",
      "Grounds & common-area maintenance, snow removal, and trash service",
      "Set on 89 landscaped acres (former Lehman Estate)"
    ],
    "commute": {
      "lirrStation": "Hicksville",
      "lirrBranch": "Ronkonkoma / Port Jefferson Branch",
      "minutesToManhattan": "~40-50 minutes to Penn Station (peak)",
      "drive": "Roughly 30-40 miles to Midtown Manhattan via the LIE (I-495)"
    },
    "officialUrl": "https://www.thehamletinjericho.com/",
    "sources": [
      {
        "url": "https://www.thehamletinjericho.com/"
      },
      {
        "url": "https://picketfarm.communitysite.com/"
      },
      {
        "url": "https://hamletcondo2.frontsteps.com/"
      },
      {
        "url": "https://www.weichert.com/NY/Nassau/Jericho/The_Hamlet_Condominiums/"
      },
      {
        "url": "https://www.neighborhoods.com/the-hamlet-jericho-ny"
      },
      {
        "url": "https://www.redfin.com/neighborhood/320952/NY/Jericho/The-Hamlet-Condominiums"
      },
      {
        "url": "http://thehamletinjericho.com/view/amenities-overview.aspx"
      },
      {
        "url": "https://www.remax.com/homes-for-sale/ny/jericho/the-hamlet-condominiums/neighborhood/516556"
      },
      {
        "url": "https://www.compass.com/listing/246-hamlet-drive-jericho-ny-11753/206351269718211009/"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/1487295/252-Hamlet-Dr-Jericho-NY-11753/"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/1487307/264-Vista-Dr-Jericho-NY-11753/"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/1487129/87-Estate-Dr-Jericho-NY-11753/"
      },
      {
        "url": "https://www.redfin.com/NY/Jericho/130-Golf-View-Dr-11753/home/20505092"
      },
      {
        "url": "https://activerain.com/blogsview/5307215/jericho-long-island-condos-at-the-hamlet"
      }
    ],
    "confidence": "high",
    "propertyTax": {
      "en": "~$17,000–$26,000 / yr",
      "zh": "约 $17,000–$26,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/hamlet-jericho/representative-hamlet-estates-home-exter.jpg",
        "caption": "Representative Hamlet Estates home exterior — 20 Kettlepond Road. Signature Prairi… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-jericho/streetscape-home-exterior-3-olde-hamlet-.jpg",
        "caption": "Streetscape / home exterior — 3 Olde Hamlet Drive. Front elevation with mature lan… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-jericho/representative-home-exterior-50-holiday-.jpg",
        "caption": "Representative home exterior — 50 Holiday Pond Road. Contemporary two-story with b… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-jericho/home-exterior-streetscape-53-kettlepond-.jpg",
        "caption": "Home exterior / streetscape — 53 Kettlepond Road. Three-quarter view showing full… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-jericho/home-exterior-17-olde-hamlet-drive-side-.jpg",
        "caption": "Home exterior — 17 Olde Hamlet Drive. Side/front elevation with stone veneer and P… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-jericho/interior-grand-two-story-marble-foyer-wi.jpg",
        "caption": "Interior — grand two-story marble foyer with curved staircase, iron chandelier and… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-jericho/current-active-listing-primary-photo-com.jpg",
        "caption": "Current active listing primary photo (community feed) — home exterior. From the li… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      },
      {
        "src": "/communities/hamlet-jericho/current-active-listing-primary-photo-com-2.jpg",
        "caption": "Current active listing primary photo (community feed) — home/streetscape. From the… · Photo: casamere-hoa.s3.us-east-1.amazonaws.com"
      }
    ],
    "image": "/communities/hamlet-jericho/representative-hamlet-estates-home-exter.jpg"
  },
  {
    "slug": "lattingtown-ponds",
    "name": "Lattingtown Ponds",
    "town": "Glen Cove",
    "gov": "Glen Cove (city)",
    "subRegion": "North Shore",
    "gateType": "gated",
    "homesCount": "56",
    "homeTypes": "Townhomes and single-family homes, 3–4 bedrooms",
    "hoaDues": "~$800–$1,165/mo",
    "priceRange": "~$790K–$1.4M",
    "amenities": [
      "Three ponds",
      "Two tennis courts",
      "Pickleball court",
      "Gated entrance with call-for-entry security gate",
      "63 acres of landscaped grounds with specimen trees",
      "Clubhouse (recently renovated/new)",
      "In-ground community gunite pool",
      "Resident beach access / local beach privileges",
      "Adjacent to Glen Cove Golf Course (across the street)"
    ],
    "commute": {
      "lirrStation": "Glen Cove",
      "lirrBranch": "Oyster Bay Branch",
      "drive": "~25–30 miles to Midtown Manhattan"
    },
    "sources": [
      {
        "url": "https://www.neighborhoods.com/lattingtown-ponds-glen-cove-ny"
      },
      {
        "url": "https://www.laffey.com/s/ny/glen-cove-city/lattingtown-ponds-subdivision"
      },
      {
        "url": "https://www.exprealty.com/lattingtown-ponds-glen-cove-ny-real-estate"
      },
      {
        "url": "https://condoli.com/gated-hoas/"
      },
      {
        "url": "https://www.compass.com/homedetails/18-Swan-Ct-Glen-Cove-NY-11542/18UQ68_pid/"
      },
      {
        "url": "https://www.salmonrealestate.com/sold-listing/NY/Lattingtown-Ponds,Glen-Cove"
      },
      {
        "url": "https://www.redfin.com/NY/Glen-Cove/22-Athem-Dr-11542/home/20476572"
      },
      {
        "url": "https://hoa-resource.com/lattingtown-ponds-homeowners-association-glen-cove-ny/"
      },
      {
        "url": "https://hoa-community.com/lattingtown-ponds-hoa-glen-cove-ny/"
      },
      {
        "url": "https://www.movoto.com/glen-cove-ny/18-swan-ct-glen-cove-ny-11542-482_2739573/"
      },
      {
        "url": "https://www.compass.com/homedetails/2-Cardinal-Ct-Glen-Cove-NY-11542/1027384881009814945_lid/"
      },
      {
        "url": "https://www.propertyshark.com/mason/Property/1508363/23-Athem-Dr-Glen-Cove-NY-11542/"
      }
    ],
    "confidence": "medium",
    "builtYear": "1990s (units dated ~1989–1996)",
    "propertyTax": {
      "en": "~$16,000–$22,000 / yr",
      "zh": "约 $16,000–$22,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/lattingtown-ponds/12-sparrow-court-lattingtown-ponds-glen-.jpg",
        "caption": "12 Sparrow Court, Lattingtown Ponds (Glen Cove, NY 11542) — representative townhom… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-ponds/2-cardinal-court-lattingtown-ponds-repre.jpg",
        "caption": "2 Cardinal Court, Lattingtown Ponds — representative home exterior; hero photo fro… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-ponds/18-swan-court-lattingtown-ponds-3-bed-to.jpg",
        "caption": "18 Swan Court, Lattingtown Ponds — 3-bed townhome exterior; hero photo from the Co… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-ponds/9-pembroke-drive-glen-cove-ny-11542-home.jpg",
        "caption": "9 Pembroke Drive, Glen Cove NY 11542 — home exterior/streetscape near/within the c… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      },
      {
        "src": "/communities/lattingtown-ponds/115-lattingtown-road-glen-cove-ny-11542-.jpg",
        "caption": "115 Lattingtown Road, Glen Cove NY 11542 — property on the main road serving the c… · Listing photo · courtesy of the listing brokerage (OneKey® MLS)"
      }
    ],
    "image": "/communities/lattingtown-ponds/12-sparrow-court-lattingtown-ponds-glen-.jpg"
  },
  {
    "slug": "summit-high-point-north-hills",
    "name": "The Summit at High Point",
    "town": "Roslyn Heights (North Hills)",
    "gov": "North Hempstead",
    "subRegion": "North Shore",
    "gateType": "guard-gated-24h",
    "builtYear": "converted 1985, completed 1988",
    "homesCount": "~170",
    "homeTypes": "Townhouse-style condominiums (six layouts), plus apartments in The Gables and residences in the historic Ryan mansion",
    "priceRange": "~$1.33M–$1.6M",
    "amenities": [
      "Clubhouse in the historic John F. Ryan mansion",
      "Indoor pool",
      "Pickleball courts",
      "Fitness center / health club",
      "Playground and basketball court",
      "24-hour guard-gated entry with gatehouse",
      "Outdoor pool with cabanas and towel service",
      "Lit tennis courts",
      "Steam room",
      "Jacuzzi / hot tub",
      "Landscaped grounds with gazebo",
      "Close to LIRR, major highways, shopping and dining"
    ],
    "commute": {
      "drive": "Off the LIE (I-495) Exit 37 / Willis Avenue"
    },
    "sources": [
      {
        "url": "https://www.condoli.com/the-summit-at-high-point-north-hills/"
      },
      {
        "url": "https://www.judyscondos.com/The-Summit-at-High-Point"
      },
      {
        "url": "https://www.bhsusa.com/for-sale/new-york/roslyn-heights/summit-high-point-at-nhs/55-center-court-55-roslyn-heights-ny-11577/L3572524-386458"
      },
      {
        "url": "https://www.neighborhoods.com/the-summit-at-high-point-roslyn-heights-ny"
      },
      {
        "url": "https://www.coldwellbankerhomes.com/ny/roslyn-heights/144-the-crescent/pid_70901985/"
      },
      {
        "url": "https://www.coldwellbankerhomes.com/ny/roslyn-heights/137-the-crescent-137/pid_17581404/"
      },
      {
        "url": "https://www.elliman.com/newyork/sold/detail/612-l-610-16_2922519/116-the-crescent-roslyn-heights-ny-11577"
      },
      {
        "url": "https://www.zillow.com/homedetails/144-The-Cres-Roslyn-Heights-NY-11577/31086343_zpid/"
      },
      {
        "url": "https://www.exprealty.com/summit-at-high-point-roslyn-heights-ny-real-estate/condos"
      },
      {
        "url": "https://www.ownwell.com/trends/new-york/nassau-county/roslyn-heights"
      },
      {
        "url": "https://www.hpnh2.com/"
      }
    ],
    "confidence": "medium",
    "hoaDues": "~$950–$1,380 / mo",
    "propertyTax": {
      "en": "~$17,000–$22,000 / yr",
      "zh": "约 $17,000–$22,000 / 年"
    },
    "gallery": [
      {
        "src": "/communities/summit-high-point-north-hills/elevated-aerial-view-of-the-community-ro.jpg",
        "caption": "Elevated / aerial view of the community — rows of terracotta-roofed townhomes set… · Photo: cdn.erealtymedia.com"
      },
      {
        "src": "/communities/summit-high-point-north-hills/outdoor-tennis-courts-green-hard-courts-.jpg",
        "caption": "Outdoor tennis courts (green hard courts) at the community's racquet/health-club a… · Photo: cdn.erealtymedia.com"
      },
      {
        "src": "/communities/summit-high-point-north-hills/indoor-swimming-pool-in-the-community-cl.jpg",
        "caption": "Indoor swimming pool in the community clubhouse / health club. WebP, · Photo: cdn.erealtymedia.com"
      },
      {
        "src": "/communities/summit-high-point-north-hills/fitness-center-gym-community-health-club.jpg",
        "caption": "Fitness center / gym (community health club). WebP, · Photo: cdn.erealtymedia.com"
      },
      {
        "src": "/communities/summit-high-point-north-hills/townhouse-building-exterior-streetscape-.jpg",
        "caption": "Townhouse building exterior / streetscape (gray-sided multi-unit building). WebP 1… · Photo: cdn.erealtymedia.com"
      },
      {
        "src": "/communities/summit-high-point-north-hills/streetscape-row-of-townhouse-building-ex.jpg",
        "caption": "Streetscape: row of townhouse building exteriors with private wooden decks. WebP, · Photo: cdn.erealtymedia.com"
      },
      {
        "src": "/communities/summit-high-point-north-hills/streetscape-townhouse-row-exteriors-with.jpg",
        "caption": "Streetscape: townhouse row exteriors with decks and landscaped grounds. WebP, · Photo: cdn.erealtymedia.com"
      },
      {
        "src": "/communities/summit-high-point-north-hills/covered-patio-deck-of-a-home-overlooking.jpg",
        "caption": "Covered patio/deck of a home overlooking the community's landscaped grounds. WebP, · Photo: cdn.erealtymedia.com"
      },
      {
        "src": "/communities/summit-high-point-north-hills/landscaped-grounds-flower-garden-walking.jpg",
        "caption": "Landscaped grounds / flower-garden walking path within the community. WebP, · Photo: cdn.erealtymedia.com"
      },
      {
        "src": "/communities/summit-high-point-north-hills/landscaped-community-common-area-garden-.jpg",
        "caption": "Landscaped community common area / garden with signage and plantings near a buildi… · Photo: cdn.erealtymedia.com"
      },
      {
        "src": "/communities/summit-high-point-north-hills/home-exterior-with-private-deck-and-wood.jpg",
        "caption": "Home exterior with private deck and wooded backdrop (representative unit). WebP, · Photo: cdn.erealtymedia.com"
      },
      {
        "src": "/communities/summit-high-point-north-hills/representative-interior-marble-finished-.jpg",
        "caption": "Representative interior: marble-finished bathroom in a community unit. WebP, · Photo: cdn.erealtymedia.com"
      }
    ],
    "image": "/communities/summit-high-point-north-hills/elevated-aerial-view-of-the-community-ro.jpg"
  }
];
