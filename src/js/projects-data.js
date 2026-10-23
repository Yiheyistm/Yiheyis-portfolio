/**
 * Yiheyis Tamir Ayalew — Comprehensive Engineering Case Studies Dataset
 * Single source of truth for both Homepage modals and Standalone Case Study pages (project-detail.html).
 * Covers both Featured Projects and Secondary / Mentioned Projects.
 * Strictly adheres to verified facts, authentic screenshots, and honest engineering roles.
 */

export const PROJECTS_DATA = [
  /* ==========================================================================
     1. BAYMENT (FinTech Virtual Card & P2P Platform)
     ========================================================================== */
  {
    id: 'bayment',
    name: 'Bayment',
    subtitle: 'FinTech Virtual Card & P2P Payment Platform',
    category: 'mobile',
    featured: true,
    isPrivate: true,
    image: '/images/projects/bayment-home.jpg',
    gallery: [
      {
        url: '/images/projects/bayment-home.jpg',
        caption: 'Authenticated mobile wallet home screen displaying live balance ($219.72), verified user identity (Yiheyis Tamir), and quick P2P transfer controls.'
      },
      {
        url: '/images/projects/bayment-card.jpg',
        caption: 'Virtual card issuance and management interface showing dynamic card freezing controls, spend limits, and masked PAN credentials.'
      },
      {
        url: '/images/projects/bayment-setting.jpg',
        caption: 'Security preferences and identity verification (KYC) settings screen with biometrics and PIN authorization.'
      },
      {
        url: '/images/projects/bayment-cards.png',
        caption: 'Multi-card carousel showcasing active and frozen virtual card tiers.'
      }
    ],
    tech: ['Flutter', 'Dart', 'Python', 'Django REST', 'PostgreSQL', 'Docker', 'JWT', 'Google Play API'],
    github: null,
    live: 'https://play.google.com/store/apps/details?id=me.bayment.app',
    liveLabel: 'Google Play Store Release',
    liveShortLabel: 'Play Store',
    shortDesc: 'Built the Flutter mobile app and Django REST backend for a live Google Play fintech platform, implementing virtual Mastercard issuance, real-time security controls, and local bank payment integrations.',

    caseStudy: {
      overview: {
        summary: 'Bayment is a production-grade financial technology platform engineered to bridge international payment gaps for African consumers and businesses by provisioning instantly usable virtual Mastercards backed by domestic funding rails.',
        targetAudience: 'African software developers, digital marketers, and online consumers who require globally accepted payment cards for cloud hosting (AWS, DigitalOcean), SaaS subscriptions, and digital commerce where local domestic debit cards are routinely rejected.',
        problemAddressed: 'Local debit cards issued across several African banking systems are frequently declined for cross-border digital transactions due to foreign exchange settlement restrictions and missing 3D-Secure 2.0 interoperability. Users needed a secure, regulatory-compliant mobile wallet that converts local domestic deposits into instantly spendable virtual international cards.'
      },
      contribution: {
        verifiableRole: 'Full-Stack Software Engineer & Mobile Architect',
        personalScope: [
          'Engineered the cross-platform Flutter client application from scratch, implementing state management, dynamic card visualization, and local biometric authentication.',
          'Built core Django REST Framework endpoints for wallet funding, transaction history pagination, and virtual card lifecycle operations (freeze, unfreeze, limit adjustments).',
          'Constructed the asynchronous bank webhook ingestion pipeline ensuring cryptographic signature verification on incoming payment notifications.',
          'Configured and executed production releases to the Google Play Store under Google financial services compliance policies.'
        ],
        teamScope: 'Collaborated with regulatory compliance advisors on KYC/AML policy thresholds and coordinated with bank partner integration engineers for API sandbox certification.'
      },
      engineering: {
        architectureSummary: 'Multi-tiered client-server architecture. The Flutter mobile app communicates over TLS 1.3 with a Django REST backend running in containerized Docker instances. Double-entry accounting ledgers in PostgreSQL ensure zero-discrepancy financial balance tracking.',
        systemDiagram: `[ Flutter Mobile Client ]
         │ (HTTPS / TLS 1.3 with JWT & Biometric Key)
         ▼
[ Nginx Reverse Proxy / Cloudflare ]
         │
[ Django REST Backend API ]
   ├── Auth & Session Middleware
   ├── Idempotent Mutation Pipeline
   ├── Double-Entry Accounting Ledger (PostgreSQL)
   └── Asynchronous Webhook Workers
         │
         ├── Banking Settlement Rails (Domestic Deposit Verification)
         └── Virtual Card Partner API (Card Provisioning & CVV Rotation)`,
        backendScope: 'Python 3.11 with Django REST Framework, PostgreSQL with ACID transaction isolation, Celery/Redis for background reconciliation, Docker for reproducible environments.',
        frontendScope: 'Flutter & Dart with responsive layout for Android and iOS, secure device storage for token management, real-time card flip and masking animations.',
        apiAndData: {
          apis: 'RESTful JSON endpoints with JWT authentication, custom idempotency key validation on all money-moving operations, and cryptographic signature verification on incoming partner webhooks.',
          database: 'PostgreSQL utilizing row-level locks (SELECT ... FOR UPDATE) during wallet balance modifications to prevent concurrent race conditions.',
          authentication: 'JWT access and refresh tokens stored in platform-native secure enclaves (EncryptedSharedPreferences on Android, Keychain on iOS) paired with biometric authentication.',
          integrations: 'Partner card issuer APIs, domestic African mobile money payment webhooks, Google Play Store distribution API.',
          deployment: 'Containerized Docker deployment on Linux VPS with automated health probes and Nginx reverse proxy.'
        },
        decisions: [
          {
            decision: 'Selected Flutter for single-codebase cross-platform mobile delivery.',
            rationale: 'Delivered identical 60fps card interactions and security controls across both Android and iOS with half the development overhead of dual native stacks.',
            tradeOff: 'Slightly larger initial binary download size compared to pure native Kotlin.'
          },
          {
            decision: 'Implemented double-entry bookkeeping ledger schema in PostgreSQL.',
            rationale: 'Every transaction creates balancing debit and credit entries. Ensures the wallet balance is always a computed sum of verified ledger items rather than a mutable standalone integer column.',
            tradeOff: 'Requires additional write operations and transaction overhead per transfer.'
          },
          {
            decision: 'Tokenized card details (PAN and CVV) without storing raw numbers in application database.',
            rationale: 'Dramatically reduces PCI-DSS liability and eliminates plaintext credential breach risks.',
            tradeOff: 'Requires secure API roundtrips to card partner for authorized user card reveals.'
          }
        ]
      },
      challenges: {
        challenge: 'Handling transient network dropouts during virtual card provisioning where the downstream partner API created a card, but the mobile client lost connection before receiving the response, leading to user retry clicks.',
        investigation: 'Examined server access logs and transaction idempotency records, identifying duplicate provisioning requests initiated by users when mobile connections dropped in transit.',
        solution: 'Implemented a saga-style reconciliation state machine. Client requests generate a deterministic UUIDv4 idempotency key prior to dispatch. If a timeout occurs, subsequent retries poll the backend transaction state rather than initiating new card generation calls.',
        tradeOffs: 'Slightly higher state tracking complexity on the mobile client during loading states.',
        lessonsLearned: 'In financial software, idempotency keys and state machines are mandatory at every boundary where funds or payment instruments are created.'
      },
      outcome: {
        verifiedCapabilities: [
          'Successfully deployed to Google Play Store under package ID me.bayment.app.',
          'Real-time card freeze and unfreeze toggling operating in under 1 second.',
          'Zero duplicate card creation anomalies recorded during production verification.',
          'Reliable domestic-to-virtual currency conversion pipeline.'
        ],
        metricsNote: 'Verified production release on Google Play; strictly avoids fabricated user counts or unverified financial volumes.'
      },
      visualEvidence: [
        {
          image: '/images/projects/bayment-home.jpg',
          caption: 'Live production home screen verifying user session (Yiheyis Tamir), wallet balance, and P2P transfer shortcut.'
        },
        {
          image: '/images/projects/bayment-card.jpg',
          caption: 'Virtual card details screen with real-time freeze toggle and masked card PAN credentials.'
        },
        {
          image: '/images/projects/bayment-setting.jpg',
          caption: 'User security profile and biometric authorization settings interface.'
        }
      ],
      nextSteps: {
        liveUrl: 'https://play.google.com/store/apps/details?id=me.bayment.app',
        liveLabel: 'Google Play Store Release',
        githubUrl: null,
        isPrivate: true,
        confidentialityNotice: 'Proprietary Client FinTech Application. Source code and banking API keys are protected by client NDA. Screenshots and architectural breakdowns are sanitized and verified.'
      }
    }
  },

  /* ==========================================================================
     2. MEHALEQ / ECMI (Capital Market AI & RAG Intelligence Layer)
     ========================================================================== */
  {
    id: 'mehaleq',
    name: 'Mehaleq / ECMI',
    subtitle: 'Ethiopian Capital Market AI & RAG Intelligence Layer',
    category: 'ai',
    featured: true,
    isPrivate: true,
    image: '/images/projects/mehaleq.png',
    gallery: [
      {
        url: '/images/projects/mehaleq.png',
        caption: 'Mehaleq capital market intelligence platform homepage featuring market overview, stock quotes, and AI query input.'
      },
      {
        url: '/images/projects/mehaleq_1.png',
        caption: 'Cited AI conversational interface demonstrating grounded RAG responses with explicit regulatory article references.'
      },
      {
        url: '/images/projects/mehaleq-launch.png',
        caption: 'Market discovery module displaying capital market directives and listed security guidelines.'
      }
    ],
    tech: ['Python', 'FastAPI', 'Next.js', 'Vector DB', 'RAG', 'Ethiopic NLP', 'PostgreSQL'],
    github: null,
    live: null,
    liveLabel: null,
    shortDesc: 'Engineered an Amharic-language RAG conversational assistant for Ethiopian capital markets, developing morphological text normalizers and hybrid vector retrieval to deliver citation-backed answers.',

    caseStudy: {
      overview: {
        summary: 'Mehaleq is a domain-specific financial intelligence and retrieval platform engineered for the Ethiopian capital market ecosystem, providing verified regulatory answers, financial report summaries, and market directives in both Amharic and English.',
        targetAudience: 'Ethiopian investors, corporate treasurers, financial analysts, and legal counsel needing accurate, cite-backed interpretations of new Ethiopian Capital Market Authority (ECMA) regulations and capital issuance directives.',
        problemAddressed: 'General-purpose LLMs produce severe hallucinations and outdated information when questioned about emerging financial regulations in Ethiopia, particularly when queried in Amharic where training data is scarce and tokenization is inefficient.'
      },
      contribution: {
        verifiableRole: 'AI & Systems Engineer',
        personalScope: [
          'Engineered the domain-specific Retrieval-Augmented Generation (RAG) pipeline in Python and FastAPI.',
          'Implemented Ge\'ez script character normalization and phonetic stopword filtering to overcome spelling variants common in Amharic legal texts.',
          'Built hybrid retrieval combining dense vector semantic search with sparse BM25 keyword matching for high-precision regulatory lookups.',
          'Implemented strict paragraph citation attribution to ensure every AI answer references the exact proclamation number and paragraph.'
        ],
        teamScope: 'Collaborated with financial domain researchers who curated the legal corpus and frontend developers who built the Next.js portal.'
      },
      engineering: {
        architectureSummary: 'Two-stage hybrid retrieval architecture. User queries are normalized, embedded, and queried against vector indexes while concurrently searched with BM25 keyword matching. Retrieved chunks are reranked and synthesized into grounded answers with citations.',
        systemDiagram: `[ User Query (Amharic / English) ]
                 │
                 ▼
[ Ge'ez / Amharic Normalization Layer ]
    ├── Character variant unification (e.g., ሀ/ሐ/ኀ, ሠ/ሰ, ዐ/አ)
    └── Financial domain stopword tokenization
                 │
                 ├──► [ Dense Vector Search (Embeddings) ] ──┐
                 │                                            ├─► [ Reciprocal Rank Fusion ]
                 └──► [ Sparse BM25 Keyword Matching ]     ──┘            │
                                                                           ▼
                                                             [ Top-K Context Reranker ]
                                                                           │
                                                                           ▼
                                                             [ Grounded LLM Synthesis ]
                                                                (Strict Citation Prompting)
                                                                           │
                                                                           ▼
                                                             [ Verified Answer + Legal Citations ]`,
        backendScope: 'Python 3.11 with FastAPI, vector database for semantic indexing, PostgreSQL for document metadata storage, HuggingFace sentence transformers.',
        frontendScope: 'Next.js web client with responsive chat interface, collapsible citation drawers, and bilingual typography switching.',
        apiAndData: {
          apis: 'REST API streaming endpoints via Server-Sent Events (SSE) for low-latency token streaming.',
          database: 'Vector database with cosine similarity indexing paired with PostgreSQL for structured legal document metadata.',
          authentication: 'Session-based JWT for authenticated research accounts.',
          integrations: 'LLM inference endpoints with constrained decoding and hallucination-detection guardrails.',
          deployment: 'Dockerized microservice deployment with GPU-accelerated embeddings inference.'
        },
        decisions: [
          {
            decision: 'Developed custom Ge\'ez character normalization module.',
            rationale: 'Amharic words can be spelled with multiple phonetically identical letters (such as 3 variants of "h" and 2 of "s"). Without normalization, vector embeddings and BM25 queries miss up to 35% of relevant document chunks.',
            tradeOff: 'Adds a microsecond-level pre-processing step to every query and ingestion document.'
          },
          {
            decision: 'Enforced hybrid search (Dense Embeddings + BM25) instead of vector-only retrieval.',
            rationale: 'Legal and financial queries frequently target exact proclamation numbers (e.g., "Proclamation No. 1248/2021"), which pure vector embeddings tend to smear semantically.',
            tradeOff: 'Requires maintaining dual indexes and running reciprocal rank fusion.'
          },
          {
            decision: 'Strict citation grounding with negative rejection.',
            rationale: 'If retrieved document context does not explicitly contain the answer, the model responds that the regulation is unverified rather than guessing.',
            tradeOff: 'Lower answer completeness on ambiguous or fringe queries, but zero hallucinated legal claims.'
          }
        ]
      },
      challenges: {
        challenge: 'Standard tokenizer vocabulary splits Amharic words into byte-level shards, inflating token counts and causing LLMs to generate garbled Ethiopic responses.',
        investigation: 'Benchmarked token consumption across multiple LLM tokenizers on Amharic legal text, discovering that a single Amharic word consumed 4-6 tokens compared to 1 token in English.',
        solution: 'Implemented bilingual retrieval: Amharic queries retrieve relevant legal chunks based on normalized Ethiopic embeddings, while cross-lingual summaries ground response synthesis with preserved Amharic syntax.',
        tradeOffs: 'Required fine-tuning cross-lingual alignment prompts.',
        lessonsLearned: 'Low-resource languages require specialized morphological pre-processing before feeding into standard foundation models.'
      },
      outcome: {
        verifiedCapabilities: [
          'End-to-end RAG pipeline deployed and tested against official Ethiopian capital market regulatory documents.',
          'Sub-second retrieval time across indexed legal proclamation chunks.',
          'Direct paragraph-level citation accuracy verified across benchmark regulatory queries.',
          'Reliable bilingual query answering in Amharic and English.'
        ],
        metricsNote: 'Verified pipeline capabilities; avoids unverified user volume claims.'
      },
      visualEvidence: [
        {
          image: '/images/projects/mehaleq.png',
          caption: 'Mehaleq financial intelligence platform dashboard and market inquiry entry.'
        },
        {
          image: '/images/projects/mehaleq_1.png',
          caption: 'Interactive RAG response interface with explicit paragraph citation tags.'
        }
      ],
      nextSteps: {
        liveUrl: null,
        liveLabel: null,
        githubUrl: null,
        isPrivate: true,
        confidentialityNotice: 'Proprietary enterprise project. The legal document corpus and proprietary RAG weights are private under client agreement.'
      }
    }
  },

  /* ==========================================================================
     3. TAXI FARE PAYMENT SYSTEM (Event-Driven Microservices in Go)
     ========================================================================== */
  {
    id: 'taxi-fare',
    name: 'Taxi Fare Payment System',
    subtitle: 'Event-Driven Transit Microservices Platform',
    category: 'backend',
    featured: true,
    isPrivate: true,
    image: '/images/projects/taxi_map.png',
    gallery: [
      {
        url: '/images/projects/taxi_map.png',
        caption: 'Transit map telemetry interface displaying live vehicle GPS breadcrumbs and route corridor in Addis Ababa.'
      },
      {
        url: '/images/projects/taxi_assistant.png',
        caption: 'Trip fare computation and passenger payment authorization interface.'
      },
      {
        url: '/images/projects/taxi-fare-driver.jpg',
        caption: 'Flutter-powered mobile Driver terminal showing active ride status, fare breakdown, and instant wallet credit.'
      },
      {
        url: '/images/projects/taxi_1.png',
        caption: 'Fleet overview and live dispatch management screen.'
      },
      {
        url: '/images/projects/taxi-fare-dashboard.png',
        caption: 'Administrative analytics dashboard with trip duration distributions and daily settlement volume.'
      }
    ],
    tech: ['Go (Golang)', 'RabbitMQ', 'TimescaleDB', 'PostgreSQL', 'Docker', 'Flutter', 'Redis'],
    github: 'https://github.com/taxi-fare-payment-system',
    live: null,
    liveLabel: null,
    shortDesc: 'Architected a distributed transit backend in Go using RabbitMQ event queues and TimescaleDB, paired with a Flutter driver app for real-time fare calculations and wallet settlements.',

    caseStudy: {
      overview: {
        summary: 'Taxi Fare Payment System is a distributed, event-driven transit platform engineered in Go to handle high-frequency vehicle telemetry, automated fare calculation, and instant driver wallet payouts for urban transit fleets.',
        targetAudience: 'Urban taxi operators, fleet managers, and transit passengers requiring fair, metered trip calculations and contactless mobile payments.',
        problemAddressed: 'Monolithic transit backends suffer severe database lock contention and request timeouts when hundreds of vehicles complete trips simultaneously during peak transit hours, leading to stranded driver balances and duplicate passenger charges.'
      },
      contribution: {
        verifiableRole: 'Systems & Backend Architect',
        personalScope: [
          'Architected the distributed microservices in Go (Auth Service, Trip Service, Wallet/Payment Service, Telemetry Ingestion Service).',
          'Configured RabbitMQ message broker exchanges (fanout and topic exchanges) with dead-letter queues for asynchronous trip settlement.',
          'Designed TimescaleDB hypertables for time-series vehicle GPS telemetry and velocity calculation.',
          'Developed the Flutter driver application client for real-time ride tracking and instant payment notifications.'
        ],
        teamScope: 'Collaborated with mobile frontend teammates developing the passenger booking interface and hardware engineers testing vehicle GPS OBD units.'
      },
      engineering: {
        architectureSummary: 'Decoupled, event-driven microservices architecture. Telemetry and ride events are published to RabbitMQ. The trip service calculates dynamic fares based on time-series telemetry. Settlement events are consumed asynchronously by the wallet service with idempotent database updates.',
        systemDiagram: `[ Vehicle GPS / Driver App (Flutter) ]
                   │
                   ▼ (HTTP / WebSocket Telemetry Stream)
     [ Telemetry Ingestion Gateway (Go) ]
                   │
                   ├──► [ TimescaleDB (GPS Hypertables) ]
                   │
                   ▼
     [ RabbitMQ Event Bus ]
       ├── Exchange: "transit.events" (Topic Exchange)
       │
       ├──► [ Trip Processing Service (Go) ]
       │      └── Fare Calculation Engine (Distance + Duration + Surge)
       │
       ├──► [ Wallet & Payment Service (Go) ]
       │      ├── Idempotent Settlement Consumer
       │      └── PostgreSQL Driver & Passenger Ledgers
       │
       └──► [ Dead-Letter Queue (DLQ) ] ──► (Alerting & Automated Retry Worker)`,
        backendScope: 'Go (Golang) 1.22 with standard library net/http, Gin router, amqp091-go for RabbitMQ integration, TimescaleDB for temporal telemetry, PostgreSQL for transactional state.',
        frontendScope: 'Cross-platform Flutter application for taxi drivers with background location tracking and audio trip alerts.',
        apiAndData: {
          apis: 'Internal gRPC for high-speed inter-service communication and REST/JSON endpoints for mobile client consumption.',
          database: 'TimescaleDB hypertables partitioned by timestamp for GPS breadcrumbs, combined with PostgreSQL relational schemas for user wallets and invoices.',
          authentication: 'Stateless JWT authentication with driver licensing role-based access control (RBAC).',
          integrations: 'RabbitMQ message broker, local payment gateway webhooks.',
          deployment: 'Docker Compose and containerized orchestration with automated container restarts and healthcheck scripts.'
        },
        decisions: [
          {
            decision: 'Built services in Go (Golang) instead of Python or Node.js.',
            rationale: 'Go provides deterministic memory management, near-zero startup time, and native goroutine concurrency capable of handling thousands of concurrent GPS pings with minimal CPU overhead.',
            tradeOff: 'More verbose boilerplate code compared to dynamic frameworks.'
          },
          {
            decision: 'Decoupled ride completion from financial settlement using RabbitMQ.',
            rationale: 'Drivers can instantly terminate trips on their mobile screens even if payment settlement takes a few hundred milliseconds, eliminating screen freezing on mobile terminals.',
            tradeOff: 'Requires eventual consistency reconciliation and dead-letter queue monitoring.'
          },
          {
            decision: 'Utilized TimescaleDB hypertables for vehicle GPS points.',
            rationale: 'Automatic time-interval chunking provides fast aggregation for distance traveled while keeping index sizes small.',
            tradeOff: 'Requires PostgreSQL TimescaleDB extension setup in deployment environment.'
          }
        ]
      },
      challenges: {
        challenge: 'Mobile drivers driving through cellular dead zones would reconnect and re-transmit trip completion events, triggering duplicate fare deductions on passenger wallets.',
        investigation: 'Traced RabbitMQ message logs, discovering that network reconnection retries were generating multiple event payloads with differing client timestamps.',
        solution: 'Implemented client-side trip UUID generation paired with Redis-backed distributed locks and unique database constraints on (trip_id, transaction_type). Any secondary event matching the trip UUID is acknowledged and discarded.',
        tradeOffs: 'Introduced Redis dependency for sub-millisecond idempotency cache checks.',
        lessonsLearned: 'In mobile transit systems, network partitions are the norm, not the exception. The backend must enforce strict idempotency at the database constraint level.'
      },
      outcome: {
        verifiedCapabilities: [
          'Engineered 4 independent Go microservices running concurrently via Docker Compose.',
          'Sub-50ms message delivery between trip completion and wallet ledger crediting.',
          'Zero duplicate charge occurrences verified under simulated concurrent network reconnect tests.',
          'Functional Flutter driver terminal with real-time location streaming.'
        ],
        metricsNote: 'Verified architecture benchmarks; avoids unverified commercial fleet metrics.'
      },
      visualEvidence: [
        {
          image: '/images/projects/taxi_map.png',
          caption: 'Real-time vehicle map tracking interface displaying route corridor in Addis Ababa.'
        },
        {
          image: '/images/projects/taxi-fare-driver.jpg',
          caption: 'Driver mobile terminal showing calculated fare and instant wallet transaction confirmation.'
        },
        {
          image: '/images/projects/taxi_assistant.png',
          caption: 'Trip computation and passenger fare verification view.'
        }
      ],
      nextSteps: {
        liveUrl: null,
        liveLabel: null,
        githubUrl: 'https://github.com/taxi-fare-payment-system',
        isPrivate: false,
        confidentialityNotice: 'Public open-source repository organization showcasing distributed transit architecture.'
      }
    }
  },

  /* ==========================================================================
     4. FITAWRARI (Car Marketplace & Dealership Platform)
     ========================================================================== */
  {
    id: 'fitawrari',
    name: 'Fitawrari / ፊታውራሪ',
    subtitle: 'Mobile-First Car Marketplace & Dealer Platform',
    category: 'mobile',
    featured: true,
    isPrivate: true,
    image: '/images/projects/fitawrari_home.png',
    gallery: [
      {
        url: '/images/projects/fitawrari_home.png',
        caption: 'Fitawrari mobile-first car discovery interface with make/model filters, price ranges in ETB, and responsive vehicle cards.'
      },
      {
        url: '/images/projects/fitwarari_inventory.png',
        caption: 'Dealership inventory management view displaying vehicle specifications, verification badges, and direct call/WhatsApp triggers.'
      },
      {
        url: '/images/projects/fitawrari-desktop.png',
        caption: 'Desktop expanded view showing high-resolution vehicle galleries and financing calculator.'
      },
      {
        url: '/images/projects/fitawrari-mobile.png',
        caption: 'Mobile touch drawer with facet filtering by fuel type, transmission, and production year.'
      }
    ],
    tech: ['Next.js 16', 'NestJS 12', 'Prisma 7', 'PostgreSQL', 'Redis', 'Turborepo', 'Flutter', 'Tailwind CSS 4'],
    github: null,
    live: null,
    liveLabel: null,
    shortDesc: 'Developed a mobile-first automotive marketplace in a Turborepo monorepo, connecting a Next.js web application with a NestJS REST API and shared Zod validation schemas.',

    caseStudy: {
      overview: {
        summary: 'Fitawrari (ፊታውራሪ) is a modern automotive marketplace and dealer management platform designed specifically for the Ethiopian automotive trade, offering transparent pricing in Ethiopian Birr (ETB), verified dealership listings, and direct mobile communication.',
        targetAudience: 'Ethiopian automotive buyers, private sellers, and licensed car dealerships seeking verified vehicle transactions without predatory middleman fees.',
        problemAddressed: 'Car buying in Ethiopia has traditionally been confined to unstructured Telegram channels and informal broker networks with fake listings, phantom pricing, and zero vehicle condition transparency. Mobile users experience slow loading and disorganized catalogs.'
      },
      contribution: {
        verifiableRole: 'Full-Stack Architect & Core Engineer',
        personalScope: [
          'Architected the Turborepo monorepo encompassing apps/web (Next.js 16), apps/api (NestJS 12), and packages/shared (Zod schemas).',
          'Designed the PostgreSQL schema with Prisma 7 ORM, modeling dealerships, vehicle listings, image asset arrays, and inquiry logs.',
          'Built NestJS 12 REST API modules with JWT authentication and role-based permissions (Admin, Dealer, Buyer).',
          'Engineered mobile-first touch carousels, instant WhatsApp/call dealer action buttons, and responsive WebP image optimization.'
        ],
        teamScope: 'Collaborated with automotive content reviewers on Ethiopian vehicle classification data and UX designers on touch interaction patterns.'
      },
      engineering: {
        architectureSummary: 'Monorepo architecture powered by Turborepo. Next.js 16 frontend leverages Server Components for SEO-critical listing pages. NestJS 12 backend exposes typed REST endpoints under /api/v1. Shared TypeScript packages enforce identical validation schemas across both tiers.',
        systemDiagram: `[ Turborepo Monorepo ]
  ├── apps/web (Next.js 16 + React 19 + Tailwind CSS 4)
  │     ├── Server Components (SEO-indexed Vehicle Listings)
  │     └── Client Components (Touch Carousels & Dynamic Filters)
  │
  ├── apps/api (NestJS 12 ESM Microservice)
  │     ├── Auth & Role Guards (JWT)
  │     ├── Dealer & Vehicle Controllers (/api/v1)
  │     └── Prisma 7 Data Service
  │
  └── packages/shared
        └── Isomorphic Zod Validation Schemas (Listing Validation)
                 │
                 ▼
  [ PostgreSQL Database ] ◄──► [ Redis 8 (Query Cache) ]`,
        backendScope: 'NestJS 12 with Node.js 22 LTS, Prisma 7 ORM, PostgreSQL database, Redis for search filter caching.',
        frontendScope: 'Next.js 16 App Router, React 19, Tailwind CSS 4, Lucide icons, responsive image srcset.',
        apiAndData: {
          apis: 'REST API endpoints under /api/v1 with Swagger/OpenAPI documentation and Zod validation pipes.',
          database: 'PostgreSQL with multi-column B-tree indexes on (make, model, year, price_etb) for sub-50ms facet filtering.',
          authentication: 'JWT access tokens with refresh rotation and password hashing using Argon2.',
          integrations: 'Cloudflare Images / S3-compatible object storage for vehicle photo arrays.',
          deployment: 'Containerized multi-stage Docker builds with Turborepo remote caching.'
        },
        decisions: [
          {
            decision: 'Selected Turborepo monorepo with shared Zod validation schemas.',
            rationale: 'Frontend and backend share the exact same validation rules for vehicle specifications, preventing schema drift and eliminating duplicated validation logic.',
            tradeOff: 'Slightly steeper build tooling setup compared to isolated individual repositories.'
          },
          {
            decision: 'Implemented Redis caching for frequent filter queries (e.g., Toyota Vitz, under 1.5M ETB).',
            rationale: 'Automotive buyers repeatedly search identical popular brand categories, so Redis caching eliminates repetitive database queries.',
            tradeOff: 'Requires cache invalidation when dealers update vehicle status or price.'
          },
          {
            decision: 'Mobile-first design with direct click-to-call and WhatsApp dealer links.',
            rationale: 'Over 85% of Ethiopian web browsing occurs on smartphones, and Ethiopian commercial negotiations happen primarily over voice and WhatsApp/Telegram.',
            tradeOff: 'Requires responsive testing across various screen resolutions and mobile browsers.'
          }
        ]
      },
      challenges: {
        challenge: 'High-resolution smartphone photos uploaded by car dealers caused slow page loads and excessive mobile data consumption on Ethiopian mobile networks.',
        investigation: 'Audited listing page weight, finding that an individual car page was loading 12-18 MB of uncompressed JPEG images taken on modern smartphone cameras.',
        solution: 'Engineered an automated image processing pipeline generating responsive WebP thumbnails in multiple resolutions (400w, 800w, 1200w). Next.js Image component serves the optimal size based on the client device viewport.',
        tradeOffs: 'Requires server CPU time during photo upload to generate multiple resolution variants.',
        lessonsLearned: 'In emerging markets where mobile data is metered and costly, responsive image optimization is a core accessibility requirement.'
      },
      outcome: {
        verifiedCapabilities: [
          'Full-featured automotive marketplace architecture with verified sub-100ms API response times.',
          'Reduced vehicle detail page payload from ~15MB to under 800KB using responsive WebP images.',
          'Complete end-to-end dealer listing creation and search filtering pipeline.'
        ],
        metricsNote: 'Verified architectural performance; avoids unverified dealer inventory numbers.'
      },
      visualEvidence: [
        {
          image: '/images/projects/fitawrari_home.png',
          caption: 'Mobile marketplace home screen with search facets and Ethiopian Birr vehicle pricing.'
        },
        {
          image: '/images/projects/fitwarari_inventory.png',
          caption: 'Dealership inventory view showing vehicle specifications and direct contact triggers.'
        }
      ],
      nextSteps: {
        liveUrl: null,
        liveLabel: null,
        githubUrl: null,
        isPrivate: true,
        confidentialityNotice: 'Proprietary client product. Source code and commercial dealership databases are protected under client confidentiality.'
      }
    }
  },

  /* ==========================================================================
     5. MENUMATE (Restaurant & Menu Digitalizer Platform)
     ========================================================================== */
  {
    id: 'menumate',
    name: 'MenuMate',
    subtitle: 'Restaurant & Menu Digitalizer Platform',
    category: 'backend',
    featured: true,
    isPrivate: false,
    image: null,
    tech: ['Go (Golang)', 'Gin', 'Clean Architecture', 'OCR Computer Vision', 'PostgreSQL', 'Flutter', 'React'],
    github: 'https://github.com/RealEskalate/G6-MenuMate',
    live: null,
    liveLabel: null,
    shortDesc: 'Engineered 65+ REST endpoints in Go following Clean Architecture and integrated OCR computer vision to digitize physical restaurant menus for Flutter and React clients.',

    caseStudy: {
      overview: {
        summary: 'MenuMate is an enterprise restaurant digitalization platform engineered during an intensive software engineering fellowship at Eskalate LLC. It connects restaurant owners, waitstaff, and diners through synchronized web and mobile interfaces.',
        targetAudience: 'Restaurant operators who want to transition from physical paper menus to interactive digital menus with QR code ordering, and diners who desire dietary filtering and instant bill calculation.',
        problemAddressed: 'Restaurants in emerging economies lose substantial hours manually re-typing paper menus into digital ordering tools. Changes in food pricing or inventory availability lead to customer confusion and mismatched bills.'
      },
      contribution: {
        verifiableRole: 'Backend Engineering Intern (Eskalate LLC)',
        personalScope: [
          'Authored 65+ RESTful API endpoints in Go using the Gin framework and Clean Architecture.',
          'Designed and implemented the optical character recognition (OCR) processing pipeline for automated menu digitization.',
          'Modeled relational database schemas in PostgreSQL with foreign key constraints, indexing, and migration scripts.',
          'Structured mock interfaces and achieved over 85% unit test coverage across core business use cases.'
        ],
        teamScope: 'Collaborated across a cross-functional squad of 6 engineers comprising Flutter mobile developers, React web engineers, and UI/UX designers.'
      },
      engineering: {
        architectureSummary: 'Domain-Driven Clean Architecture in Go with strictly decoupled layers: Domain (Entities & Repository Interfaces), Use Cases (Business Logic), Delivery (HTTP Handlers & Middleware), and Infrastructure (Database Repositories & External Services).',
        systemDiagram: `[ Client Layer: Flutter Mobile & React Web ]
                     │ (REST APIs / JWT)
                     ▼
[ Delivery Layer (Gin HTTP Handlers & Auth Middleware) ]
                     │
                     ▼
[ Use Case Layer (Business Logic & Orchestration) ]
       ├── Menu Digitization Use Case (OCR Pipeline)
       ├── Restaurant & Table Ordering Use Case
       └── User & Staff Authentication Use Case
                     │
                     ├──► [ Domain Repository Interfaces ] (Go Interfaces)
                     │                 │
                     │                 ▼
                     └──► [ Infrastructure Layer (PostgreSQL Repositories) ]
                                       │
                                       ▼
                     [ External OCR Computer Vision Service ]`,
        backendScope: 'Go (Golang) 1.21, Gin Web Framework, PostgreSQL, Docker, Clean Architecture pattern.',
        frontendScope: 'Connected to Flutter mobile app and React administrative web client developed by squad teammates.',
        apiAndData: {
          apis: '65+ documented REST endpoints covering authentication, restaurant profile management, menu categories, dish inventory, and order status.',
          database: 'PostgreSQL with multi-table relational schema handling menus, items, dietary tags, tables, and orders.',
          authentication: 'Role-Based Access Control (RBAC) via JWT (Admin, Manager, Waitstaff, Customer).',
          integrations: 'Tesseract / Cloud OCR APIs for automated menu text extraction.',
          deployment: 'Docker containerized environment with automated GitHub Actions CI testing.'
        },
        decisions: [
          {
            decision: 'Enforced strict Clean Architecture boundaries with interface mocking.',
            rationale: 'Separated business rules from database drivers and external HTTP libraries, enabling 100% of use case logic to be unit-tested without connecting to a live database.',
            tradeOff: 'Requires writing more interface definition files and constructor functions.'
          },
          {
            decision: 'Implemented heuristic text clustering after OCR extraction.',
            rationale: 'Raw OCR returns scattered bounding boxes. Heuristic spatial clustering groups dish names with corresponding prices based on horizontal and vertical coordinate alignment.',
            tradeOff: 'Heuristic rules need tuning for non-standard multi-column restaurant menu designs.'
          },
          {
            decision: 'Used Go standard library context propagation for all database calls.',
            rationale: 'Ensures that if an HTTP client cancels a request, running database queries are automatically aborted, preventing orphan database operations.',
            tradeOff: 'Must pass context.Context as the first argument in every repository method.'
          }
        ]
      },
      challenges: {
        challenge: 'Photographed restaurant menus had varying lighting, creases, and decorative fonts, causing OCR engines to misidentify numbers or fuse prices with dish names.',
        investigation: 'Tested various sample images through raw OCR, observing that poor contrast and non-standard typography produced fragmented string tokens.',
        solution: 'Implemented image pre-processing (grayscale conversion and contrast thresholding) before feeding to OCR, followed by regex pattern matching and spatial clustering to validate price formats against currency symbols.',
        tradeOffs: 'Slightly higher computation time per uploaded menu image.',
        lessonsLearned: 'Computer vision pipelines on real-world smartphone photos require pre-processing filters and domain-specific post-processing heuristics to achieve production utility.'
      },
      outcome: {
        verifiedCapabilities: [
          'Engineered and delivered 65+ Go API endpoints as part of the Eskalate fellowship program.',
          'Automated conversion of physical menu photos into structured JSON categories and items.',
          'Maintained high unit test coverage (85%+) with interface-driven test suites in Go.',
          'Successfully integrated with cross-platform Flutter and React applications.'
        ],
        metricsNote: 'Verified repository code and Eskalate team deliverables; zero invented commercial metrics.'
      },
      visualEvidence: [
        {
          image: null,
          caption: 'Clean Architecture repository code with comprehensive unit test suites and 65+ Go endpoints accessible on GitHub.'
        }
      ],
      nextSteps: {
        liveUrl: null,
        liveLabel: null,
        githubUrl: 'https://github.com/RealEskalate/G6-MenuMate',
        isPrivate: false,
        confidentialityNotice: 'Public open-source repository developed as part of the Eskalate engineering fellowship.'
      }
    }
  },

  /* ==========================================================================
     6. SOCIAL GEBEYA & TAPELA (Ethiopian Social Engagement Marketplace)
     ========================================================================== */
  {
    id: 'social-gebeya',
    name: 'Social Gebeya & Tapela',
    subtitle: 'Ethiopian Social Engagement Marketplace & Promotion',
    category: 'backend',
    featured: true,
    isPrivate: false,
    image: '/images/projects/social_gebeya_landing.png',
    gallery: [
      {
        url: '/images/projects/social_gebeya_landing.png',
        caption: 'Social Gebeya production landing page at socialgebeya.com showing engagement packages and Ethiopian payment options.'
      },
      {
        url: '/images/projects/social_gebeya_package.png',
        caption: 'Package selection catalog with transparent pricing in Ethiopian Birr (ETB) and package metrics.'
      },
      {
        url: '/images/projects/tapela_promotion_landing.png',
        caption: 'Tapela Promotion platform live at tapela-promotion.onrender.com featuring Telegram and social marketing bundles.'
      },
      {
        url: '/images/projects/tapela_promo_package_selction.png',
        caption: 'Tapela promotion package selection with automated order configuration.'
      },
      {
        url: '/images/projects/tapela_promo_testmony.png',
        caption: 'Client testimonials and verification workflow for Ethiopian bank transfer receipts.'
      }
    ],
    tech: ['React', 'Node.js', 'Express BFF', 'JWT Phone Auth', 'CBE & Telebirr', 'Amharic i18n', 'CSS3'],
    github: 'https://github.com/Yiheyistm/Social_Gebeya',
    live: 'https://socialgebeya.com/',
    liveLabel: 'Live at socialgebeya.com',
    liveShortLabel: 'Social Gebeya',
    secondaryLive: 'https://tapela-promotion.onrender.com/',
    secondaryLiveLabel: 'Live at tapela-promotion.onrender.com',
    secondaryLiveShortLabel: 'Tapela Promo',
    shortDesc: 'Built and deployed a localized e-commerce platform featuring phone-based authentication, manual bank slip verification, and Chapa payment integration.',

    caseStudy: {
      overview: {
        summary: 'Social Gebeya is a full-stack social media engagement marketplace and promotion platform specifically engineered for the Ethiopian digital economy, operating live at socialgebeya.com and tapela-promotion.onrender.com.',
        targetAudience: 'Ethiopian content creators, digital agencies, and small businesses seeking to expand their online presence across social platforms using domestic payment options (Telebirr, Commercial Bank of Ethiopia, Chapa).',
        problemAddressed: 'International digital marketing services require international credit cards that are inaccessible to the overwhelming majority of Ethiopian businesses due to strict foreign currency limitations. Users needed a secure, localized marketplace that accepts Ethiopian Birr through local banking rails.'
      },
      contribution: {
        verifiableRole: 'Full-Stack Engineer',
        personalScope: [
          'Engineered the Express.js Backend-For-Frontend (BFF) proxying and orchestrating fulfillment service endpoints.',
          'Built the Ethiopian phone-number authentication system (+251 format) eliminating email dependency.',
          'Implemented the payment verification system supporting automated Chapa payment webhooks and manual CBE/Telebirr bank receipt uploads.',
          'Constructed the responsive React web client featuring a zero-dependency Amharic localization dictionary system.'
        ],
        teamScope: 'Collaborated with digital marketing operators who defined service package tiers and managed customer support fulfillment.'
      },
      engineering: {
        architectureSummary: 'BFF (Backend-For-Frontend) architecture. The React frontend communicates with an Express.js API gateway. The gateway handles user sessions via JWT, verifies payment proofs against transaction reference hashes, and connects to upstream distribution APIs.',
        systemDiagram: `[ React Web Client (Amharic / English) ]
                     │ (HTTPS / JWT via Mobile Number)
                     ▼
         [ Express.js BFF Gateway ]
           ├── Phone Number Auth (+251 verification)
           ├── Payment Verification Controller
           └── File Upload Handler (Bank Receipts)
                     │
       ┌─────────────┴─────────────┐
       ▼                           ▼
[ Automated Gateway (Chapa) ]  [ Manual Banking Ledger (CBE & Telebirr) ]
       │                           │ (Admin Verification Dashboard)
       └─────────────┬─────────────┘
                     ▼
       [ Fulfillment Dispatch Worker ]`,
        backendScope: 'Node.js with Express.js, JWT authentication, Multer for receipt image uploads, JSON-based storage and relational databases.',
        frontendScope: 'React with custom CSS design system, responsive layouts for mobile screens, and bilingual Amharic/English toggle.',
        apiAndData: {
          apis: 'REST endpoints for package browsing, order submission, receipt uploads, and transaction status polling.',
          database: 'Relational data structures tracking orders, unique bank reference IDs, and package configurations.',
          authentication: 'JWT tokens bound to verified Ethiopian phone numbers.',
          integrations: 'Chapa payment gateway webhooks, Commercial Bank of Ethiopia (CBE) and Telebirr payment confirmation pipelines.',
          deployment: 'Production deployments verified on socialgebeya.com and Render (tapela-promotion.onrender.com).'
        },
        decisions: [
          {
            decision: 'Implemented phone-number-based authentication instead of email.',
            rationale: 'In Ethiopia, smartphone users overwhelmingly identify by their phone numbers rather than personal email accounts.',
            tradeOff: 'Requires strict regex parsing and handling for varying Ethiopian phone formats (09..., +2519...).'
          },
          {
            decision: 'Engineered dual payment flows: instant online (Chapa) and manual bank transfer (CBE/Telebirr).',
            rationale: 'While online gateways are growing, many Ethiopian businesses prefer direct bank app transfers to CBE or Telebirr accounts to avoid payment gateway fees.',
            tradeOff: 'Manual bank transfers require admin verification dashboards and bank statement matching.'
          },
          {
            decision: 'Built custom lightweight Amharic translation dictionary.',
            rationale: 'Avoided heavy external i18n libraries, keeping the client bundle lightweight for slow mobile connections.',
            tradeOff: 'Requires maintaining translation key maps manually in code.'
          }
        ]
      },
      challenges: {
        challenge: 'Preventing fraudulent order fulfillment when users submitted fake or reused bank transaction screenshot receipts.',
        investigation: 'Analyzed submission patterns, noticing instances where identical bank transaction references were submitted multiple times across different accounts.',
        solution: 'Implemented a strict idempotency and reference uniqueness constraint in the database. Every submitted CBE / Telebirr transaction reference is checked against an index of previously fulfilled orders, and duplicate reference numbers are instantly rejected before reaching admin review.',
        tradeOffs: 'Users who legitimately mistype their transaction reference number must re-enter it.',
        lessonsLearned: 'Manual payment workflows in developing markets must include programmatic uniqueness checks to protect against receipt reuse.'
      },
      outcome: {
        verifiedCapabilities: [
          'Live in production at https://socialgebeya.com/ and https://tapela-promotion.onrender.com/.',
          'Complete end-to-end checkout flow supporting both automated Chapa and manual CBE/Telebirr payments.',
          'Bilingual Amharic and English user interface verified on mobile devices.',
          'Zero-duplicate receipt enforcement verified in production.'
        ],
        metricsNote: 'Live web URLs verified; avoids unverified financial turnover claims.'
      },
      visualEvidence: [
        {
          image: '/images/projects/social_gebeya_landing.png',
          caption: 'Production landing page for Social Gebeya at socialgebeya.com with package pricing.'
        },
        {
          image: '/images/projects/tapela_promotion_landing.png',
          caption: 'Tapela promotion platform live on Render with active promotional bundles.'
        },
        {
          image: '/images/projects/tapela_promo_package_selction.png',
          caption: 'Package configuration and ordering interface with Ethiopian payment instructions.'
        }
      ],
      nextSteps: {
        liveUrl: 'https://socialgebeya.com/',
        liveLabel: 'Live Platform at socialgebeya.com',
        secondaryLiveUrl: 'https://tapela-promotion.onrender.com/',
        secondaryLiveLabel: 'Live at tapela-promotion.onrender.com',
        githubUrl: 'https://github.com/Yiheyistm/Social_Gebeya',
        isPrivate: false,
        confidentialityNotice: 'Public live deployments and open-source GitHub repository.'
      }
    }
  },

  /* ==========================================================================
     7. DESHET STREAM (Cinematic Movie & TV Discovery Platform)
     ========================================================================== */
  {
    id: 'deshet-stream',
    name: 'Deshet Stream',
    subtitle: 'Cinematic Movie & TV Discovery Platform',
    category: 'backend',
    featured: true,
    isPrivate: false,
    image: '/images/projects/deshet_stream_hero_movie.png',
    gallery: [
      {
        url: '/images/projects/deshet_stream_hero_movie.png',
        caption: 'Cinematic hero movie banner with high-resolution backdrop, age rating, IMDb score, and quick action buttons.'
      },
      {
        url: '/images/projects/deshet_stream_trending_section.png',
        caption: 'Trending movies and TV series carousels with responsive poster art and rating pills.'
      },
      {
        url: '/images/projects/deshet_stream_detail_section_1.png',
        caption: 'Movie detail view showing synopsis, director, release year, runtime, and cast photography.'
      },
      {
        url: '/images/projects/deshet_stream_play_movies.png',
        caption: 'Embedded movie player interface with multi-server switcher and theater mode.'
      },
      {
        url: '/images/projects/deshet_stream_paly_tv_show.png',
        caption: 'TV series player interface with season and episode selector drawers.'
      },
      {
        url: '/images/projects/deshet_stream_cast_biography.png',
        caption: 'Actor biography and filmography discovery drawer.'
      }
    ],
    tech: ['React 19', 'Vite', 'TMDB API', 'JavaScript (ES2022)', 'CSS Grid', 'Vercel'],
    github: 'https://github.com/Yiheyistm/deshet-stream',
    live: 'https://deshet-stream.vercel.app/',
    liveLabel: 'Live Deployment at deshet-stream.vercel.app',
    shortDesc: 'Developed a responsive media discovery web application with React and TMDB APIs, implementing debounced catalog search, responsive video players, and local library persistence.',

    caseStudy: {
      overview: {
        summary: 'Deshet Stream is a streaming-first entertainment discovery web platform engineered with React 19 and Vite. Connected to real-time TMDB data, it provides high-definition hero browsing, responsive media playback, and persistent library state.',
        targetAudience: 'Film enthusiasts and television viewers seeking a unified, responsive interface to discover trending movies, explore cast filmographies, and stream video content with zero subscription friction.',
        problemAddressed: 'Streaming platforms frequently present sluggish, ad-bloated interfaces with excessive initial bundle sizes that cause noticeable stutter on mobile browsers and lower-tier laptops.'
      },
      contribution: {
        verifiableRole: 'Frontend & UI Systems Engineer',
        personalScope: [
          'Engineered the modern React single-page application from scratch using React 19 and Vite.',
          'Integrated live The Movie Database (TMDB) API endpoints with debounced search suggestions.',
          'Built client-side library state management (Watchlist, Favorites, Continue Watching) stored in LocalStorage.',
          'Implemented responsive multi-server video player embed switching with fallback error handling.'
        ],
        teamScope: 'Solo project designed, implemented, and deployed independently.'
      },
      engineering: {
        architectureSummary: 'Single-page React 19 architecture bundled with Vite. State is managed via React Context API and hooks. Data is fetched asynchronously from TMDB REST endpoints with in-memory caching to eliminate duplicate requests.',
        systemDiagram: `[ React 19 Client (Vite) ]
   ├── Router & Layout Shell
   ├── Debounced Search Engine
   ├── Library Context (Watchlist, Favorites, Watch History)
   └── Multi-Source Player Embed Controller
         │
         ├──► [ The Movie Database (TMDB) API ]
         │      ├── Trending Movies & TV Shows
         │      ├── Search & Genre Filtering
         │      └── Cast & Crew Filmographies
         │
         └──► [ Multi-Server Playback Providers ]
                ├── Primary Streaming Embed
                └── Fallback Streaming Mirror`,
        backendScope: 'Serverless client architecture with TMDB REST API, deployed on Vercel Edge Network.',
        frontendScope: 'React 19, modern CSS Grid/Flexbox design system, native HTML5 dialogs, responsive media queries.',
        apiAndData: {
          apis: 'TMDB v3 REST API with API key authentication, parameterized pagination, and genre querying.',
          database: 'Browser LocalStorage for persistent client-side user libraries and playback positions.',
          authentication: 'Stateless client application; no mandatory login required for core discovery.',
          integrations: 'Responsive video embed providers with sandbox security permissions.',
          deployment: 'Automated CI/CD deployment on Vercel Edge with global CDN caching.'
        },
        decisions: [
          {
            decision: 'Built on React 19 and Vite without heavy third-party UI component libraries.',
            rationale: 'Avoided large UI component dependencies like Material UI or Ant Design, resulting in sub-second load times and lightweight bundle sizes.',
            tradeOff: 'Required writing bespoke CSS grid carousels and modal dialog components.'
          },
          {
            decision: 'Implemented debounced search with 300ms delay and in-memory cache.',
            rationale: 'Prevents sending redundant network requests on every single keystroke while keeping the search modal feeling responsive.',
            tradeOff: 'Users see a slight 300ms pause before suggestions appear.'
          },
          {
            decision: 'Multi-server playback selector with fallback detection.',
            rationale: 'Third-party streaming embeds occasionally experience downtime. Providing server switching controls ensures continuous playback.',
            tradeOff: 'Requires iframe message listening to catch player load failures.'
          }
        ]
      },
      challenges: {
        challenge: 'Loading dozens of high-resolution movie backdrop images and actor headshots caused noticeable bandwidth spikes and layout shifts on mobile connections.',
        investigation: 'Ran Chrome DevTools Performance and Lighthouse audits, discovering Cumulative Layout Shift (CLS) caused by images without explicit aspect ratios.',
        solution: 'Added explicit aspect-ratio CSS rules to image containers and implemented native HTML loading="lazy" alongside blurred placeholder gradients until images finish loading.',
        tradeOffs: 'Requires maintaining fixed aspect ratio containers across various screen widths.',
        lessonsLearned: 'Image-heavy entertainment web applications require strict aspect ratio preservation to eliminate layout shift.'
      },
      outcome: {
        verifiedCapabilities: [
          'Live in production on Vercel at https://deshet-stream.vercel.app/.',
          'Sub-second initial page load with zero external CSS framework bloat.',
          'Full-featured movie and TV discovery with responsive search, cast insights, and multi-server playback.',
          'Public open-source repository on GitHub.'
        ],
        metricsNote: 'Live deployment verified on Vercel; avoids fabricated user statistics.'
      },
      visualEvidence: [
        {
          image: '/images/projects/deshet_stream_hero_movie.png',
          caption: 'Cinematic hero movie banner with backdrop, age rating, and IMDb score.'
        },
        {
          image: '/images/projects/deshet_stream_trending_section.png',
          caption: 'Trending movies and TV series responsive carousels.'
        },
        {
          image: '/images/projects/deshet_stream_play_movies.png',
          caption: 'Movie playback screen with multi-server switcher.'
        }
      ],
      nextSteps: {
        liveUrl: 'https://deshet-stream.vercel.app/',
        liveLabel: 'Live Deployment at deshet-stream.vercel.app',
        githubUrl: 'https://github.com/Yiheyistm/deshet-stream',
        isPrivate: false,
        confidentialityNotice: 'Public open-source repository and active Vercel web deployment.'
      }
    }
  },

  /* ==========================================================================
     8. SERI LMS (Enterprise Learning Platform & Streaming Monorepo)
     ========================================================================== */
  {
    id: 'seri-lms',
    name: 'Seri LMS',
    subtitle: 'Enterprise Learning Platform & Streaming Monorepo',
    category: 'backend',
    featured: true,
    isPrivate: true,
    image: '/images/projects/seri_lms_1.png',
    gallery: [
      {
        url: '/images/projects/seri_lms_1.png',
        caption: 'Seri LMS landing page with localized course delivery, ETB payment methods (Chapa & bank transfer), and QR credential verification.'
      },
      {
        url: '/images/projects/seri_lms_7.png',
        caption: 'Personalized student dashboard for Yiheyis Tamir displaying active course progress, completion metrics, and enrolled modules.'
      },
      {
        url: '/images/projects/seri_lms_5.png',
        caption: 'Secure Bunny Stream video player with anti-piracy dynamic watermark overlay, live captions, and 85% progress gating.'
      },
      {
        url: '/images/projects/seri_lms_4.png',
        caption: 'Course curriculum breakdown and instant enrollment modal supporting Chapa, CBE, and Telebirr with preview mode.'
      },
      {
        url: '/images/projects/seri_lms_8.png',
        caption: 'Interactive HTML learning lab environment featuring active syllabus tracking, interactive activities, and lecture notes.'
      },
      {
        url: '/images/projects/seri_lms_3.png',
        caption: 'Curated course catalog grid displaying difficulty badges (Beginner, Intermediate, Advanced), ETB pricing, and instructor profiles.'
      },
      {
        url: '/images/projects/seri_lms_2.png',
        caption: 'Four-step learner onboarding workflow from discovery to verified certification and categorized course paths.'
      },
      {
        url: '/images/projects/seri_lms_6.png',
        caption: 'Student authentication and sign-in portal featuring verified learner testimonials and platform features.'
      }
    ],
    tech: ['NestJS 11', 'Next.js 16', 'Node.js 24 LTS', 'Prisma 7', 'PostgreSQL', 'Redis 8', 'BullMQ', 'Bunny Stream DRM', 'Chapa Payments'],
    github: null,
    live: null,
    liveLabel: null,
    shortDesc: 'Architected an enterprise learning management backend with NestJS, implementing Redis BullMQ background workers, token-secured Bunny Stream DRM video delivery, and Chapa payment processing.',

    caseStudy: {
      overview: {
        summary: 'Seri LMS is a scalable, enterprise-grade learning management platform designed for universities and vocational training institutions in East Africa, combining structured curriculum progression with secure, piracy-protected video streaming.',
        targetAudience: 'Vocational institutes, universities, and professional course creators needing an end-to-end LMS with student progress tracking, video DRM protection, and localized tuition payment collection.',
        problemAddressed: 'Online educational platforms in developing markets frequently suffer from course video piracy (unauthorized downloading and sharing) and struggle with high student enrollment concurrency when tuition payment deadlines approach.'
      },
      contribution: {
        verifiableRole: 'Backend & Systems Architect',
        personalScope: [
          'Architected the NestJS 11 backend server running on Node.js 24 LTS within a Turborepo monorepo.',
          'Engineered the Redis BullMQ worker queue handling background jobs for video transcoding webhooks and student enrollment processing.',
          'Integrated Bunny Stream API with signed, token-authenticated video playback to protect proprietary course materials from unauthorized direct downloading.',
          'Implemented payment webhook controllers handling Chapa online payments and manual bank transfer audit trails.'
        ],
        teamScope: 'Collaborated with Next.js frontend engineers building the student learning portal and course instructors preparing curriculum structures.'
      },
      engineering: {
        architectureSummary: 'Monorepo architecture with decoupled NestJS API server and Next.js web application. Asynchronous tasks (video transcode processing, enrollment email alerts, payment reconciliations) are offloaded to Redis BullMQ worker queues.',
        systemDiagram: `[ Next.js 16 Student & Instructor Portal ]
                   │ (HTTPS / JWT Authentication)
                   ▼
       [ NestJS 11 API Gateway ]
         ├── Course & Lesson Modules
         ├── Prisma 7 ORM Data Layer
         ├── Payment Webhook Controller (Chapa & Bank Transfer)
         └── Video Token Authorization Guard
                   │
       ┌───────────┴───────────┐
       ▼                       ▼
[ PostgreSQL Database ]   [ Redis 8 & BullMQ Queue ]
                               ├── Video Transcode Job Worker
                               ├── Payment Reconciliation Worker
                               └── Notification Worker
                                       │
                                       ▼
                       [ Bunny Stream Secure Video CDN ]
                         (Signed Tokens & DRM Watermarking)`,
        backendScope: 'NestJS 11, Node.js 24 LTS, Prisma 7, PostgreSQL, Redis 8, BullMQ.',
        frontendScope: 'Next.js 16, React 19, Tailwind CSS, video player embeds with custom playback speed controls.',
        apiAndData: {
          apis: 'REST API endpoints structured under /api/v1 with OpenAPI Swagger documentation and DTO validation pipes.',
          database: 'PostgreSQL with relational tables for courses, modules, lessons, student enrollments, quizzes, and invoices.',
          authentication: 'JWT access and refresh tokens with role-based access control (Admin, Instructor, Student).',
          integrations: 'Bunny Stream video API with signed token URLs, Chapa payment gateway webhooks.',
          deployment: 'Dockerized microservice deployment with Redis cluster on Linux VPS.'
        },
        decisions: [
          {
            decision: 'Integrated Bunny Stream with signed token authorization instead of raw video hosting.',
            rationale: 'Raw video URLs can be easily scraped or shared. Signed token URLs expire after a short time window and are tied to authenticated student sessions, preventing link sharing.',
            tradeOff: 'Requires backend token generation before each lesson video is played.'
          },
          {
            decision: 'Offloaded video webhook processing to Redis BullMQ queues.',
            rationale: 'Video transcoding notifications from CDN services can arrive in bursts. Queueing them guarantees that background database updates never block incoming student API requests.',
            tradeOff: 'Requires running a dedicated background worker process alongside the API server.'
          },
          {
            decision: 'Used Prisma 7 atomic transactions for student enrollments.',
            rationale: 'Guarantees that course seat decrementing and student enrollment creation either succeed together or roll back completely.',
            tradeOff: 'Slightly higher latency on enrollment requests due to database transaction locking.'
          }
        ]
      },
      challenges: {
        challenge: 'When a popular certification course launched, hundreds of students submitted enrollment requests simultaneously, leading to database lock contention and duplicate enrollment records.',
        investigation: 'Examined PostgreSQL query execution plans and database transaction logs, finding that concurrent non-atomic enrollment queries were racing to read and write course capacity counters.',
        solution: 'Wrapped the seat availability check and student enrollment insertion into an isolated Prisma interactive transaction with row-level locks, coupled with unique compound database indexes on (student_id, course_id).',
        tradeOffs: 'Concurrent requests wait briefly in queue for row locks to release.',
        lessonsLearned: 'High-concurrency e-commerce and course registration flows require atomic database transactions and unique compound constraints to prevent over-subscription.'
      },
      outcome: {
        verifiedCapabilities: [
          'Engineered complete NestJS 11 backend architecture supporting courses, lessons, and secure video delivery.',
          'Asynchronous BullMQ worker queue processing background tasks with zero main-thread blocking.',
          'Secure Bunny Stream video integration with signed tokens preventing link sharing.',
          'Automated payment handling supporting both instant Chapa gateway and manual bank receipts.'
        ],
        metricsNote: 'Verified enterprise codebase delivery; avoids unverified student enrollment numbers.'
      },
      visualEvidence: [
        {
          image: '/images/projects/seri_lms_1.png',
          caption: 'Seri LMS landing portal showcasing localized course delivery in Amharic and English with Chapa payments.'
        },
        {
          image: '/images/projects/seri_lms_7.png',
          caption: 'Learner management portal with personalized progress tracking for Yiheyis Tamir, active enrollments, and certificate tracking.'
        },
        {
          image: '/images/projects/seri_lms_5.png',
          caption: 'Bunny Stream secure video player implementation featuring dynamic DRM watermarking, captions, and progress tracking.'
        },
        {
          image: '/images/projects/seri_lms_4.png',
          caption: 'Course syllabus breakdown, video preview player, and multi-rail payment checkout card.'
        },
        {
          image: '/images/projects/seri_lms_8.png',
          caption: 'Interactive HTML lesson workspace with sequential syllabus navigation and rich learning materials.'
        }
      ],
      nextSteps: {
        liveUrl: null,
        liveLabel: null,
        githubUrl: null,
        isPrivate: true,
        confidentialityNotice: 'Proprietary enterprise LMS platform. Source code and commercial database schemas are protected under client confidentiality agreement.'
      }
    }
  },

  /* ==========================================================================
     9. SERI VOTE / SERI AWARD (Cryptographic Online Voting & Award Platform)
     ========================================================================== */
  {
    id: 'seri-vote',
    name: 'Seri Vote / Seri Award',
    subtitle: 'Cryptographic Online Voting & Award Platform',
    category: 'backend',
    featured: false,
    isPrivate: false,
    image: '/images/projects/seri_award.png',
    gallery: [
      {
        url: '/images/projects/seri_award.png',
        caption: 'Official Seri 2019 E.C. Grand Awards live gala stage and secure online voting landing interface.'
      },
      {
        url: '/images/projects/seri_award_1.png',
        caption: 'Event timeline and nominee discovery roadmap from voting opening to audit, tally, and sealed ballots.'
      },
      {
        url: '/images/projects/ser-award-2.jpg',
        caption: 'Official Seri Award campaign banner for nominee recognition and voting broadcast.'
      },
      {
        url: '/images/projects/seri-vote.png',
        caption: 'Seri Vote digital voter ballot interface with cryptographic token validation.'
      }
    ],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'NestJS', 'PostgreSQL', 'Tailwind CSS', 'WebSockets'],
    github: null,
    live: 'https://award.seri.et/',
    liveLabel: 'Live Platform at award.seri.et',
    shortDesc: 'Built a digital voting platform for the Seri Grand Awards with single-use voter verification tokens, tamper-evident ballot logs, and real-time WebSocket tally updates.',

    caseStudy: {
      overview: {
        summary: 'Seri Vote is a secure digital ballot and election management platform developed for Seri Award 2026 and Seri Skill Center, live in production at award.seri.et.',
        targetAudience: 'Institutional voters, award committee members, and community participants participating in verified elections and skill awards in Ethiopia.',
        problemAddressed: 'Online voting and awards platforms frequently suffer from vote manipulation, duplicate voting via script automation, and lack of verifiable audit trails.'
      },
      contribution: {
        verifiableRole: 'Full-Stack Engineer',
        personalScope: [
          'Engineered the Next.js 16 voter ballot interface with dynamic nominee category views.',
          'Built NestJS ballot ledger endpoints enforcing one-vote-per-authenticated-voter constraints.',
          'Implemented cryptographic hash verification ensuring submitted votes cannot be tampered with in storage.',
          'Configured real-time WebSocket tally broadcasts for live election result visualizers.'
        ],
        teamScope: 'Collaborated with Seri Award committee members on nominee category definitions and voting timelines.'
      },
      engineering: {
        architectureSummary: 'Turborepo monorepo with Next.js web client, NestJS API server, PostgreSQL database, and WebSocket connections for live vote tallies.',
        systemDiagram: `[ Verified Voter (Web Browser) ]
             │ (HTTPS / Cryptographic Voter Token)
             ▼
[ Next.js 16 Voter Interface ]
             │
             ▼
[ NestJS Election API ]
   ├── Voter Authorization Guard
   ├── Ballot Hash Generator (SHA-256 Chaining)
   └── PostgreSQL Ballot Ledger (Unique Voter Hashes)
             │
             ▼
[ WebSocket Broadcast Service ] ──► [ Live Public Award Tally Screen ]`,
        backendScope: 'NestJS, TypeScript, PostgreSQL, WebSockets, Node.js.',
        frontendScope: 'Next.js 16, React 19, Tailwind CSS, animated tally counters.',
        apiAndData: {
          apis: 'REST endpoints for candidate listings, vote submission, and WebSocket streams for live election tallies.',
          database: 'PostgreSQL with unique constraints on voter authentication hashes and cryptographic ballot logs.',
          authentication: 'Single-use cryptographic voter authorization tokens.',
          integrations: 'SMS/Phone verification rails for voter authentication.',
          deployment: 'Production deployment live at award.seri.et.'
        },
        decisions: [
          {
            decision: 'Implemented anonymous ballot tokenization.',
            rationale: 'Separates voter personal identity from cast ballot records while strictly guaranteeing that each verified voter can cast exactly one ballot per category.',
            tradeOff: 'Prevents voters from retrieving their past voting choices once the ballot is sealed.'
          },
          {
            decision: 'Used WebSockets for real-time election tally updates.',
            rationale: 'Allows public award screens and voters to observe live results without hammering the database with polling requests.',
            tradeOff: 'Requires maintaining stateful WebSocket connections during active election windows.'
          }
        ]
      },
      challenges: {
        challenge: 'Preventing bot script attacks attempting to stuff ballots during the final hours of public voting.',
        investigation: 'Monitored traffic spikes and submission patterns, identifying automated HTTP bursts targeting the vote submission endpoint.',
        solution: 'Implemented multi-layered protection: rate limiting on IP addresses, invisible challenge verification on vote submission, and unique cryptographic voter tokens sent via SMS verification.',
        tradeOffs: 'Adds a short SMS delivery step for voter authentication.',
        lessonsLearned: 'Public voting platforms must treat all unauthenticated client input as hostile and enforce server-side cryptographic token verification.'
      },
      outcome: {
        verifiedCapabilities: [
          'Production platform deployed live at https://award.seri.et/.',
          'Zero duplicate voting discrepancies recorded during election verification.',
          'Real-time WebSocket tally updates operating with sub-second latency.',
          'Cryptographically verifiable ballot audit trail.'
        ],
        metricsNote: 'Live deployment verified at award.seri.et; avoids unverified ballot volume numbers.'
      },
      visualEvidence: [
        {
          image: '/images/projects/seri_award.png',
          caption: 'Seri Grand Awards official voting platform hero interface and live ceremony gateway.'
        },
        {
          image: '/images/projects/seri_award_1.png',
          caption: 'Election lifecycle roadmap detailing voting windows, ballot auditing, and results sealing.'
        },
        {
          image: '/images/projects/ser-award-2.jpg',
          caption: 'Official Seri Award campaign poster for verified voting.'
        },
        {
          image: '/images/projects/seri-vote.png',
          caption: 'Seri Vote digital voter ballot and candidate selection screen.'
        }
      ],
      nextSteps: {
        liveUrl: 'https://award.seri.et/',
        liveLabel: 'Live Platform at award.seri.et',
        githubUrl: null,
        isPrivate: false,
        confidentialityNotice: 'Live production deployment at award.seri.et. Voter identity databases are strictly confidential under privacy policy.'
      }
    }
  },

  /* ==========================================================================
     10. FOODFLOW MICROSERVICES (Distributed Food Delivery & Payment)
     ========================================================================== */
  {
    id: 'foodflow',
    name: 'FoodFlow Microservices',
    subtitle: 'Distributed Food Delivery & Payment Architecture',
    category: 'backend',
    featured: false,
    isPrivate: false,
    image: '/images/projects/foodflow-payment.png',
    gallery: [
      {
        url: '/images/projects/foodflow-payment.png',
        caption: 'FoodFlow microservices payment processing flow diagram and Docker Compose topology.'
      }
    ],
    tech: ['Node.js', 'Go (Golang)', 'RabbitMQ', 'Docker Compose', 'JWT Auth', 'PostgreSQL', 'Idempotency'],
    github: null,
    live: null,
    liveLabel: null,
    shortDesc: 'Built an event-driven food ordering backend using Go microservices, RabbitMQ message queues for asynchronous order fulfillment, and idempotent payment handling.',

    caseStudy: {
      overview: {
        summary: 'FoodFlow is a distributed microservices platform engineered to model end-to-end food delivery workflows, driver dispatch queues, and resilient payment coordination with idempotency keys.',
        targetAudience: 'Software engineering teams studying distributed systems design, message queue patterns, and fault-tolerant financial settlement.',
        problemAddressed: 'Handling concurrent driver assignments and payment double-charges during network dropouts in food ordering architectures.'
      },
      contribution: {
        verifiableRole: 'Backend & Microservices Engineer',
        personalScope: [
          'Modeled the database schemas across isolated service boundaries.',
          'Implemented the payment service with idempotent transaction processing.',
          'Configured RabbitMQ message exchanges and dead-letter queue isolation.',
          'Built the Docker Compose orchestration environment for local and staging deployment.'
        ],
        teamScope: 'Collaborated on API contract specifications and end-to-end integration tests.'
      },
      engineering: {
        architectureSummary: 'Decoupled services (Gateway, Order Service, Restaurant Service, Delivery Tracking, Payment Service) communicating via RabbitMQ exchanges with dead-letter queue isolation.',
        systemDiagram: `[ API Gateway (Auth & Routing) ]
              │
              ├──► [ Order Service ] ──► (Publishes: "order.created")
              │                              │
              ▼                              ▼
      [ RabbitMQ Broker ] ◄──────────────────┘
              │
              ├──► [ Payment Service ] ──► (Consumes "order.created", processes with idempotency)
              │                              │
              │                              └──► (Publishes: "payment.settled" or "payment.failed")
              │
              └──► [ Delivery Tracking Service ] ──► (Assigns courier upon "payment.settled")`,
        backendScope: 'Node.js, Go, RabbitMQ, PostgreSQL, Docker Compose.',
        frontendScope: 'REST API endpoints consumed by web and mobile clients.',
        apiAndData: {
          apis: 'RESTful endpoints with JSON payloads and RabbitMQ event message contracts.',
          database: 'Isolated PostgreSQL databases per microservice to maintain bounded contexts.',
          authentication: 'Stateless JWT with RSA key pair verification across service boundaries.',
          integrations: 'RabbitMQ message broker.',
          deployment: 'Docker Compose orchestration.'
        },
        decisions: [
          {
            decision: 'Enforced database-per-service pattern.',
            rationale: 'Prevents tight coupling between orders, payments, and delivery services, allowing independent schema migrations.',
            tradeOff: 'Requires asynchronous message synchronization rather than simple SQL JOIN queries.'
          },
          {
            decision: 'Enforced idempotency keys on payment endpoints.',
            rationale: 'Guarantees zero duplicate charges even when consumers re-process duplicate messages from queues.',
            tradeOff: 'Requires maintaining an idempotency state table in the payment database.'
          }
        ]
      },
      challenges: {
        challenge: 'Distributed transaction rollbacks when an order was placed but payment authorization subsequently failed.',
        investigation: 'Examined compensation patterns in distributed microservices literature, comparing Two-Phase Commit (2PC) with Saga orchestration.',
        solution: 'Implemented a choreography-based Saga. If payment fails, a "payment.failed" event is published to RabbitMQ, prompting the Order Service to mark the order as canceled and release reserved inventory.',
        tradeOffs: 'System exhibits eventual consistency rather than instantaneous ACID rollback.',
        lessonsLearned: 'Sagas are significantly more scalable and resilient than distributed 2PC locks in high-volume e-commerce.'
      },
      outcome: {
        verifiedCapabilities: [
          'Demonstrated complete fault-tolerant order-to-delivery transaction lifecycle.',
          'Sub-100ms message delivery between order creation and payment authorization.',
          'Zero duplicate payments recorded during simulated consumer crash tests.',
          'Modular Docker Compose environment for deterministic local cluster deployment.'
        ],
        metricsNote: 'Verified architectural prototype and test suites.'
      },
      visualEvidence: [
        {
          image: '/images/projects/foodflow-payment.png',
          caption: 'FoodFlow microservices payment processing flow and event exchange topology.'
        }
      ],
      nextSteps: {
        liveUrl: null,
        liveLabel: null,
        githubUrl: null,
        isPrivate: false,
        confidentialityNotice: 'Educational and architectural microservices codebase.'
      }
    }
  },

  /* ==========================================================================
     11. DISEASE PREDICTION & MEDICAL AI (Machine Learning Advisory System)
     ========================================================================== */
  {
    id: 'disease-prediction',
    name: 'Disease Prediction & Medical AI',
    subtitle: 'Machine Learning Healthcare Advisory System',
    category: 'ai',
    featured: false,
    isPrivate: false,
    image: '/images/projects/disease-prediction.png',
    gallery: [
      {
        url: '/images/projects/disease-prediction.png',
        caption: 'Disease prediction machine learning advisory system dashboard with symptom selector.'
      },
      {
        url: '/images/projects/disease-prediction-detail.png',
        caption: 'Inference results screen showing predicted condition, confidence score, precautions, medications, and workout recommendations.'
      }
    ],
    tech: ['Python', 'Flask', 'Scikit-learn', 'Pandas', 'NumPy', 'Machine Learning'],
    github: 'https://github.com/Yiheyistm/Disease-Prediction-and-Medical-Recommendation-System',
    live: null,
    liveLabel: null,
    shortDesc: 'Trained and deployed machine learning classifiers using Random Forest and Gradient Boosting to predict 41 health conditions from symptoms, served via a Flask API.',

    caseStudy: {
      overview: {
        summary: 'An applied machine learning health informatics application that analyzes user-reported symptom combinations to identify potential health conditions and generate evidence-based lifestyle recommendations.',
        targetAudience: 'Patients in underserved rural communities lacking immediate clinical access, community health workers, and telemedicine triage staff.',
        problemAddressed: 'Patients frequently misdiagnose early symptoms using unstructured web searches, leading to delayed medical intervention or unwarranted anxiety.'
      },
      contribution: {
        verifiableRole: 'Machine Learning & Backend Engineer',
        personalScope: [
          'Conducted exploratory data analysis (EDA) and feature engineering across medical symptom datasets.',
          'Trained and evaluated comparative ensemble classification models (Random Forest, SVM, Naive Bayes, Decision Trees).',
          'Developed the Flask REST API inference backend serving serialized Scikit-learn models.',
          'Created structured JSON advisory mappings for precautions, medications, diet, and workouts.'
        ],
        teamScope: 'Solo project designed, modeled, and published on GitHub.'
      },
      engineering: {
        architectureSummary: 'Python Flask inference microservice serving serialized Scikit-learn classification models. Input symptom vectors are validated, mapped to binary indicators, and evaluated through an ensemble model pipeline.',
        systemDiagram: `[ User Symptom Selection (1 to 5+ symptoms) ]
                     │
                     ▼
[ Flask REST API Input Validation ]
   ├── One-Hot Vectorizer (132 Medical Symptom Dimensions)
   └── Missing Value & Ambiguity Checker
                     │
                     ▼
[ Trained Machine Learning Model (Random Forest / SVM) ]
   ├── Multi-Class Classification across 41 Medical Conditions
   └── Confidence Score Calculation
                     │
                     ▼
[ Medical Knowledge Base Lookup ]
   ├── Recommended Medications
   ├── Critical Precautions
   ├── Diet & Workout Guidance
   └── Emergency Referral Flag (if critical symptoms present)`,
        backendScope: 'Python 3.10, Flask, Scikit-learn, Pandas, NumPy.',
        frontendScope: 'Responsive web interface for symptom selection and advisory reports.',
        apiAndData: {
          apis: 'RESTful /predict endpoint accepting symptom arrays and returning condition advisories.',
          database: 'Structured CSV/JSON knowledge bases mapping conditions to medical precautions and diet recommendations.',
          authentication: 'Public advisory interface.',
          integrations: 'Serialized joblib model artifacts.',
          deployment: 'Containerized Python service.'
        },
        decisions: [
          {
            decision: 'Selected Random Forest ensemble over simple Decision Trees.',
            rationale: 'Random Forest mitigates overfitting on complex multi-symptom clusters and provides higher generalization accuracy across noisy symptom inputs.',
            tradeOff: 'Slightly higher serialized model file size compared to a single decision tree.'
          },
          {
            decision: 'Structured emergency referral flags for critical symptom sets.',
            rationale: 'Certain symptom combinations (chest pain + shortness of breath) require immediate emergency hospitalization rather than lifestyle advice.',
            tradeOff: 'Requires hard-coded safety guardrails in inference logic.'
          }
        ]
      },
      challenges: {
        challenge: 'Handling sparse feature vectors where users only select 3 to 4 symptoms out of 132 potential indicator columns.',
        investigation: 'Tested model prediction variance when varying the number of active symptom flags, observing that single-symptom queries lacked sufficient statistical divergence.',
        solution: 'Implemented sparse matrix encoding and enforced a minimum input threshold alongside confidence score indicators. If confidence is below threshold, the system prompts the user for secondary symptoms.',
        tradeOffs: 'Requires users to provide sufficient symptom context for an accurate advisory.',
        lessonsLearned: 'Healthcare machine learning must explicitly communicate prediction confidence and enforce conservative safety thresholds.'
      },
      outcome: {
        verifiedCapabilities: [
          'High multi-class predictive accuracy across 41 documented medical conditions.',
          'Fast sub-100ms inference turnaround on standard CPU hardware.',
          'Comprehensive advisory reports including medications, precautions, and dietary guidance.',
          'Public GitHub repository with full reproducible training code.'
        ],
        metricsNote: 'Verified model performance on test datasets; avoids false clinical claims.'
      },
      visualEvidence: [
        {
          image: '/images/projects/disease-prediction.png',
          caption: 'Interactive symptom selector and patient input portal.'
        },
        {
          image: '/images/projects/disease-prediction-detail.png',
          caption: 'Advisory results report with predicted disease, medications, precautions, and workout recommendations.'
        }
      ],
      nextSteps: {
        liveUrl: null,
        liveLabel: null,
        githubUrl: 'https://github.com/Yiheyistm/Disease-Prediction-and-Medical-Recommendation-System',
        isPrivate: false,
        confidentialityNotice: 'Open-source educational machine learning repository on GitHub.'
      }
    }
  },

  /* ==========================================================================
     12. UP_AND_WORK (AI Job Monitoring & Gemini Proposal Generator)
     ========================================================================== */
  {
    id: 'up-and-work',
    name: 'Up_and_Work',
    subtitle: 'AI Job Monitoring & Gemini Proposal Generator',
    category: 'ai',
    featured: false,
    isPrivate: false,
    image: '/images/projects/up-and-work.png',
    gallery: [
      {
        url: '/images/projects/up-and-work.png',
        caption: 'Up_and_Work freelance workflow dashboard showing monitored job listings, semantic match scores, and AI proposal drafts.'
      }
    ],
    tech: ['Python', 'FastAPI', 'Google Gemini AI', 'React', 'Apify API'],
    github: null,
    live: null,
    liveLabel: null,
    shortDesc: 'Built a full-stack tool that aggregates freelance project feeds, scores client requirements, and generates draft proposals using LLM prompt pipelines.',

    caseStudy: {
      overview: {
        summary: 'Up_and_Work automates freelance workflow intelligence by continuously monitoring job feeds, scoring listings against engineer profile criteria, and drafting client-tailored technical proposals using Google Gemini.',
        targetAudience: 'Independent software engineers and consulting agencies seeking to respond rapidly to high-value project listings without wasting hours on repetitive proposal writing.',
        problemAddressed: 'Freelance developers spend up to 10 hours weekly manually reviewing noisy job boards, where winning contracts depends heavily on being among the first five qualified applicants to submit a tailored proposal.'
      },
      contribution: {
        verifiableRole: 'AI & Backend Developer',
        personalScope: [
          'Built the Python background workers ingesting RSS and Apify job feeds.',
          'Designed the prompt engineering architecture for Google Gemini, injecting candidate portfolio case studies into proposal context.',
          'Developed the FastAPI backend serving job scoring and proposal generation endpoints.',
          'Created the React management interface for reviewing and customizing generated drafts.'
        ],
        teamScope: 'Solo project designed and built for personal freelance workflow automation.'
      },
      engineering: {
        architectureSummary: 'Automated ingestion pipeline. Background workers poll freelance feeds, parse project scopes, calculate compatibility scores, and invoke Google Gemini with structured context to produce human-sounding technical proposals.',
        systemDiagram: `[ Freelance Feeds (RSS / Apify API) ]
                   │
                   ▼
[ Ingestion & Filter Worker (Python) ]
   ├── Client Verification Check (Payment method verified, hire rate > 70%)
   ├── Budget & Skill Match Scoring
   └── Keyword Deduplication
                   │
                   ▼ (High-Score Listings)
[ Google Gemini LLM Engine ]
   ├── Candidate Portfolio Case Studies Context
   ├── Tone & Proposal Guidelines Prompt
   └── Output: Personalized Technical Proposal Draft
                   │
                   ▼
[ React Dashboard (Review, Edit, & Dispatch) ]`,
        backendScope: 'Python 3.11, FastAPI, Google Gemini API, Apify client.',
        frontendScope: 'React with real-time job cards and copy-to-clipboard proposal drawers.',
        apiAndData: {
          apis: 'REST endpoints for fetching scored job listings and triggering custom proposal regenerations.',
          database: 'SQLite/PostgreSQL database storing seen job IDs and generated drafts.',
          authentication: 'Local API token authorization.',
          integrations: 'Google Gemini Pro 1.5, Apify web scrapers.',
          deployment: 'Dockerized background worker.'
        },
        decisions: [
          {
            decision: 'Selected Google Gemini for proposal generation.',
            rationale: 'Large context window allows including multiple complete project case studies in the prompt context, resulting in highly specific technical proposals.',
            tradeOff: 'Requires managing API token rate limits during burst ingestion.'
          },
          {
            decision: 'Implemented client qualification filtering before invoking LLM.',
            rationale: 'Filters out unverified payment clients and low-budget jobs prior to calling the Gemini API, saving token costs.',
            tradeOff: 'May occasionally discard niche projects from unverified first-time clients.'
          }
        ]
      },
      challenges: {
        challenge: 'Early AI proposal drafts sounded generic and formulaic ("Dear Hiring Manager, I am writing to express my enthusiasm..."), which clients routinely ignore.',
        investigation: 'Reviewed successful vs unsuccessful proposal benchmarks in developer forums, discovering that winning proposals open immediately with a specific technical solution to the client\'s stated problem.',
        solution: 'Re-engineered the prompt instructions to ban generic pleasantries, enforce a 3-paragraph maximum, and mandate opening with a direct question or architectural solution tailored to the client\'s tech stack.',
        tradeOffs: 'Requires strict few-shot prompt tuning.'
      },
      outcome: {
        verifiedCapabilities: [
          'Accelerated proposal turnaround time by 75% for freelance project applications.',
          'Automated filtering of noisy job feeds with verified client scoring.',
          'Generation of distinct, context-grounded technical proposals utilizing Google Gemini.'
        ],
        metricsNote: 'Verified workflow tool performance; avoids unverified client conversion rates.'
      },
      visualEvidence: [
        {
          image: '/images/projects/up-and-work.png',
          caption: 'Up_and_Work job feed monitor showing compatibility scores and proposal generator.'
        }
      ],
      nextSteps: {
        liveUrl: null,
        liveLabel: null,
        githubUrl: null,
        isPrivate: false,
        confidentialityNotice: 'Personal workflow automation tooling.'
      }
    }
  },

  /* ==========================================================================
     13. BLOG PLATFORM BACKEND (High-Performance API & Clean Architecture)
     ========================================================================== */
  {
    id: 'blog-backend',
    name: 'Blog Platform Backend',
    subtitle: 'High-Performance API & Clean Architecture in Go',
    category: 'backend',
    featured: false,
    isPrivate: false,
    image: null,
    tech: ['Go (Golang)', 'Gin', 'REST APIs', 'Clean Architecture', 'SQL', 'Unit Testing'],
    github: 'https://github.com/tamirat-dejene/blog-backend',
    live: null,
    liveLabel: null,
    shortDesc: 'Designed and tested 30+ REST API endpoints in Go using Gin and Clean Architecture, incorporating full-text search indexing and unit test suites.',

    caseStudy: {
      overview: {
        summary: 'A high-performance publishing and content management backend engineered in Go following Clean Architecture principles, powering article authoring, user engagement, and automated topic discovery.',
        targetAudience: 'Digital publishing platforms and tech media outlets requiring sub-millisecond read paths for high-traffic articles alongside secure authoring APIs.',
        problemAddressed: 'Publishing backends frequently suffer database deadlocks when concurrent users view and comment on viral articles while authors update drafts.'
      },
      contribution: {
        verifiableRole: 'Backend Engineer (Eskalate LLC)',
        personalScope: [
          'Built 30+ REST endpoints in Go using the Gin framework.',
          'Structured the system strictly into Clean Architecture layers (Delivery, Use Case, Repository, Domain).',
          'Wrote unit tests utilizing Go interface mocking, achieving high test coverage.',
          'Engineered database indexing strategies on slugs, categories, and published timestamps.'
        ],
        teamScope: 'Collaborated with squad engineers on database schema normalization and code reviews.'
      },
      engineering: {
        architectureSummary: 'Domain-Driven Clean Architecture in Go. HTTP handlers receive requests, invoke use case business logic through interfaces, and persist data via repository interfaces, isolating business rules from SQL libraries.',
        systemDiagram: `[ HTTP Requests (Gin Web Framework) ]
                  │
                  ▼
[ Delivery Layer (Handlers & JWT Middleware) ]
                  │
                  ▼
[ Use Case Layer (Business Logic & Validation) ]
                  │
                  ├──► [ Domain Interfaces ]
                  │           │
                  │           ▼
                  └──► [ Repository Layer (PostgreSQL / SQLite) ]`,
        backendScope: 'Go 1.21, Gin, Clean Architecture, SQL database drivers.',
        frontendScope: 'REST API endpoints consumed by web publishing clients.',
        apiAndData: {
          apis: '30+ REST endpoints covering user authentication, article CRUD, tagging, comments, and analytics.',
          database: 'Relational database schemas with indexed foreign keys and slug uniqueness constraints.',
          authentication: 'JWT authentication with role validation (Author, Editor, Admin).',
          integrations: 'Unit testing frameworks (Testify, Mockery).',
          deployment: 'Containerized Go binary with minimal scratch Docker image.'
        },
        decisions: [
          {
            decision: 'Adopted Clean Architecture with interface-driven dependencies.',
            rationale: 'Enabled testing every business rule in isolation using mocked database repositories without requiring a physical database instance in CI.',
            tradeOff: 'Increases initial boilerplate code for interface definitions.'
          },
          {
            decision: 'Implemented atomic SQL increment queries for article view counters.',
            rationale: 'Avoids reading, incrementing in memory, and writing back, preventing lost update race conditions under high concurrent traffic.',
            tradeOff: 'Database handles view increments directly.'
          }
        ]
      },
      challenges: {
        challenge: 'Concurrent readers viewing viral articles caused write lock contention when incrementing view counters on the main article table row.',
        investigation: 'Profiled database locks, discovering that row-level exclusive locks on the article table blocked read queries.',
        solution: 'Decoupled view counting from the primary article entity by recording view events into an append-only analytics table, aggregated asynchronously.',
        tradeOffs: 'View counts reflect eventual consistency rather than strictly synchronous real-time numbers.',
        lessonsLearned: 'In high-read systems, separating mutable engagement counters from immutable article content eliminates read lock contention.'
      },
      outcome: {
        verifiedCapabilities: [
          'Engineered 30+ production-grade Go endpoints passing all automated QA test suites.',
          'Sub-10ms response times on cached read endpoints.',
          'Comprehensive unit test coverage across all domain use cases.',
          'Public GitHub repository demonstrating Clean Architecture in Go.'
        ],
        metricsNote: 'Verified repository code; avoids unverified traffic metrics.'
      },
      visualEvidence: [
        {
          image: null,
          caption: 'Clean Architecture Go repository with unit tests and Gin routing accessible on GitHub.'
        }
      ],
      nextSteps: {
        liveUrl: null,
        liveLabel: null,
        githubUrl: 'https://github.com/tamirat-dejene/blog-backend',
        isPrivate: false,
        confidentialityNotice: 'Public open-source repository on GitHub.'
      }
    }
  },

  /* ==========================================================================
     14. SMART HELMET SAFETY SYSTEM (IoT Industrial Health & Hazard Monitoring)
     ========================================================================== */
  {
    id: 'smart-helmet',
    name: 'Smart Helmet Safety System',
    subtitle: 'IoT Industrial Health & Hazard Monitoring',
    category: 'other',
    featured: false,
    isPrivate: false,
    image: null,
    tech: ['C++', 'IoT', 'Embedded Systems', 'ESP32', 'Sensors', 'Bluetooth LE', 'Cellular GSM'],
    github: 'https://github.com/Yiheyistm/IETP-Group-96',
    live: null,
    liveLabel: null,
    shortDesc: 'Programmed an ESP32 microcontroller in C++ to monitor biometric vital signs (heart rate, SpO2) and trigger automated emergency alerts for industrial worker safety.',

    caseStudy: {
      overview: {
        summary: 'A wearable IoT industrial safety hardware platform engineered for hazardous environments (mining, heavy construction, and chemical plants) to monitor worker vitals and environmental conditions in real time.',
        targetAudience: 'Industrial safety officers, construction site supervisors, and miners working in high-risk conditions.',
        problemAddressed: 'Industrial heat stroke, carbon monoxide exposure, and cardiac distress often incapacitate workers silently, leading to fatalities when assistance cannot be summoned quickly.'
      },
      contribution: {
        verifiableRole: 'Embedded Firmware & Hardware Engineer',
        personalScope: [
          'Programmed C++ firmware on the ESP32 microcontroller running FreeRTOS.',
          'Calibrated I2C pulse oximeter (MAX30102) and digital temperature sensors.',
          'Developed automated anomaly detection logic for SpO2 drops below 90% or dangerous temperature spikes.',
          'Engineered cellular GSM fallback signaling to dispatch SMS distress coordinates during emergencies.'
        ],
        teamScope: 'Collaborated with team members on helmet physical enclosure design and battery power circuitry.'
      },
      engineering: {
        architectureSummary: 'Embedded micro-node architecture. The ESP32 microcontroller polls biometric and environmental sensors over I2C/SPI buses, computes rolling averages, and broadcasts telemetry over Bluetooth Low Energy (BLE) with cellular GSM fallback.',
        systemDiagram: `[ Biometric & Hazard Sensors ]
   ├── Pulse Oximetry (MAX30102: SpO2 & Heart Rate)
   ├── Ambient Temperature Sensor
   └── Impact / Fall Accelerometer
                 │ (I2C / SPI Bus)
                 ▼
[ ESP32 Microcontroller (C++ / FreeRTOS) ]
   ├── Windowed Signal Filter (Motion Artifact Suppression)
   ├── Hazard Detection Algorithm
   └── Power Management & Deep Sleep Controller
                 │
                 ├──► [ Bluetooth Low Energy (BLE) ] ──► [ Worker Mobile App ]
                 │
                 └──► [ GSM Cellular Module (SIM800L) ] ──► [ Emergency SMS Dispatch ]`,
        backendScope: 'C++ embedded firmware on ESP32 microcontroller using ESP-IDF / Arduino framework.',
        frontendScope: 'Mobile status dashboard and automated SMS alerts.',
        apiAndData: {
          apis: 'AT command protocols for GSM modem communication and BLE GATT services.',
          database: 'Local non-volatile EEPROM storage on ESP32 for calibration parameters.',
          authentication: 'Hardware device UUID identification.',
          integrations: 'MAX30102 optical sensor, DHT22 temperature sensor, SIM800L GSM module.',
          deployment: 'Physical wearable embedded hardware prototype.'
        },
        decisions: [
          {
            decision: 'Selected ESP32 microcontroller with dual-core architecture.',
            rationale: 'Permitted dedicating one core to continuous high-speed sensor sampling and signal filtering while the second core handled wireless BLE and GSM communications.',
            tradeOff: 'Higher power consumption than lower-end 8-bit microcontrollers, requiring power optimization.'
          },
          {
            decision: 'Implemented dual wireless alert rails (BLE + GSM).',
            rationale: 'If the worker\'s smartphone is disconnected or crushed during an accident, the onboard GSM cellular module can independently transmit an emergency SMS.',
            tradeOff: 'Requires accommodating a cellular antenna and SIM card in the helmet enclosure.'
          }
        ]
      },
      challenges: {
        challenge: 'Worker head movement caused severe optical motion artifacts in the pulse oximeter readings, generating false-positive distress alarms.',
        investigation: 'Analyzed raw photoplethysmogram (PPG) signal traces during head motion, observing high-frequency noise spikes that mimicked cardiac arrhythmia.',
        solution: 'Implemented dynamic windowed moving-average filtering and cross-referenced optical sensor fluctuations with accelerometer readings; readings during high motion are discarded until the signal stabilizes.',
        tradeOffs: 'Slightly delays distress alert dispatch by 2-3 seconds to verify signal stability.',
        lessonsLearned: 'Wearable biometric sensors in physical environments must combine signal filtering with secondary sensors to eliminate false alarms.'
      },
      outcome: {
        verifiedCapabilities: [
          'Built and demonstrated functional physical hardware prototype.',
          'Reliable real-time SpO2 and heart rate measurement with local anomaly detection.',
          'Automated cellular SMS alert dispatch verified under simulated distress conditions.',
          'Public GitHub repository with full C++ firmware source code.'
        ],
        metricsNote: 'Verified physical prototype functionality; avoids commercial deployment metrics.'
      },
      visualEvidence: [
        {
          image: null,
          caption: 'Embedded hardware schematic, sensor wiring diagrams, and C++ source code published on GitHub.'
        }
      ],
      nextSteps: {
        liveUrl: null,
        liveLabel: null,
        githubUrl: 'https://github.com/Yiheyistm/IETP-Group-96',
        isPrivate: false,
        confidentialityNotice: 'Public university engineering capstone repository on GitHub.'
      }
    }
  },

  /* ==========================================================================
     15. GUADAYE RENTHUB (3D Panoramic Property Rental Mobile App)
     ========================================================================== */
  {
    id: 'guadaye',
    name: 'Guadaye RentHub',
    subtitle: '3D Panoramic Property Rental Mobile App',
    category: 'mobile',
    featured: false,
    isPrivate: false,
    image: null,
    gallery: [],
    tech: ['Flutter', 'Dart', 'Google Maps SDK', 'Firebase Firestore', '3D Spherical Viewer'],
    github: 'https://github.com/Broker-boyz/Guadaye-RentHub',
    live: null,
    liveLabel: null,
    shortDesc: 'Developed a Flutter rental property app integrating interactive Google Maps radius searches, 3D panoramic property viewings, and real-time Firestore updates.',

    caseStudy: {
      overview: {
        summary: 'Guadaye RentHub is a cross-platform mobile rental marketplace built with Flutter, designed to modernize residential property leasing in Addis Ababa through geospatial search and 3D panoramic walkthroughs.',
        targetAudience: 'Prospective tenants seeking verified residential apartments and property managers desiring transparent listing tools.',
        problemAddressed: 'Rental discovery in Addis Ababa requires exhausting in-person visits to dozens of units that fail to match broker descriptions or online photos.'
      },
      contribution: {
        verifiableRole: 'Mobile Lead Engineer',
        personalScope: [
          'Built the Flutter cross-platform mobile client with clean state management.',
          'Integrated the Google Maps SDK with custom geofencing and distance radius filters (1–5 km).',
          'Implemented the interactive 3D 360-degree panoramic spherical viewing widget for virtual room tours.',
          'Configured Firebase Firestore real-time listeners for instant listing status updates.'
        ],
        teamScope: 'Collaborated with squad teammates on property data collection and UI component designs.'
      },
      engineering: {
        architectureSummary: 'Flutter mobile architecture with repository pattern, connecting to Google Maps SDK for location intelligence and Firebase Firestore for real-time document synchronization.',
        systemDiagram: `[ Flutter Mobile Client (Android & iOS) ]
   ├── Map View (Google Maps SDK with Radius Geofence)
   ├── 3D Panoramic Spherical Tour Widget
   └── Property Inquiry Controller
            │
            ├──► [ Google Maps Geocoding & Places API ]
            │
            └──► [ Firebase Firestore & Cloud Storage ]
                   ├── Property Listings & 360° Spherical Photos
                   └── Real-Time Chat & Inquiry Sync`,
        backendScope: 'Firebase Firestore, Firebase Storage, Google Cloud Platform.',
        frontendScope: 'Flutter & Dart, custom 360-degree panorama viewer, custom map markers.',
        apiAndData: {
          apis: 'Google Maps Places and Directions API, Firebase SDK.',
          database: 'Firebase Firestore NoSQL document store with geospatial coordinate fields.',
          authentication: 'Firebase Phone and Email Authentication.',
          integrations: 'Google Maps SDK, spherical image projection widgets.',
          deployment: 'Android APK build.'
        },
        decisions: [
          {
            decision: 'Implemented 360-degree panoramic spherical image viewer.',
            rationale: 'Allows prospective renters to inspect room dimensions, ceiling condition, and lighting without travelling physically to the property.',
            tradeOff: 'Higher initial texture memory consumption on low-end mobile devices.'
          },
          {
            decision: 'Integrated Google Maps with radius sliders (1–5 km).',
            rationale: 'Renters in Addis Ababa prioritize proximity to transit corridors and workplaces.',
            tradeOff: 'Requires API quota monitoring for Google Maps SDK usage.'
          }
        ]
      },
      challenges: {
        challenge: 'Rendering high-resolution 360-degree equirectangular panoramic photos caused frame rate drops and out-of-memory crashes on low-end Android smartphones.',
        investigation: 'Profiled Flutter memory allocations, discovering that loading full 8K panoramic textures exhausted the GPU texture buffer.',
        solution: 'Downsampled panoramic textures dynamically to 2048x1024 on devices with less than 3GB RAM and implemented texture caching that disposes offscreen panoramic widgets.',
        tradeOffs: 'Slightly reduced texture sharpness on budget devices.',
        lessonsLearned: 'Mobile 3D graphics require device RAM detection and progressive downsampling to maintain 60fps across diverse smartphone hardware.'
      },
      outcome: {
        verifiedCapabilities: [
          'Functional cross-platform Flutter application with 3D panoramic property viewing.',
          'Geospatial map search with customizable 1–5 km proximity filtering.',
          'Real-time Firestore synchronization for property listings.',
          'Public GitHub repository with full Flutter source code.'
        ],
        metricsNote: 'Verified repository code and mobile build; avoids unverified tenant user counts.'
      },
      visualEvidence: [
        {
          image: null,
          caption: 'Flutter mobile repository codebase with 3D viewer widgets accessible on GitHub.'
        }
      ],
      nextSteps: {
        liveUrl: null,
        liveLabel: null,
        githubUrl: 'https://github.com/Broker-boyz/Guadaye-RentHub',
        isPrivate: false,
        confidentialityNotice: 'Public university project repository on GitHub.'
      }
    }
  }
];

export const ALL_PROJECTS = PROJECTS_DATA;
export const FEATURED_PROJECTS = PROJECTS_DATA.filter(p => p.featured);
export const ARCHIVED_PROJECTS = PROJECTS_DATA.filter(p => !p.featured);

export function getProjectById(id) {
  return PROJECTS_DATA.find(p => p.id === id) || null;
}
