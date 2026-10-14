export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  author: string;
  coverImage: string;
  featured?: boolean;
  content: {
    type: "paragraph" | "heading2" | "heading3" | "list" | "image" | "callout" | "quote";
    text?: string;
    items?: string[];
    imageSrc?: string;
    imageAlt?: string;
    caption?: string;
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "guia-definitiva-tallas-grandes-como-saber-tu-talla-exacta",
    title: "Guía Definitiva de Tallas Grandes Masculinas: ¿Cómo saber tu talla exacta de camisa?",
    excerpt:
      "Aprende a tomar las 3 medidas clave (cuello, pecho y largo) para acertar con tu talla de camisa desde casa y olvídate de las prendas cuadradas o incómodas.",
    category: "Guía de Tallas",
    readingTime: "5 min de lectura",
    date: "14 Octubre, 2026",
    author: "Equipo CTG Camisas Tallas Grandes",
    coverImage: "/images/blog/blog-guia-tallas-cover.png",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Comprar camisas de vestir o casuales en tallas grandes suele ser una experiencia frustrante. En las tiendas tradicionales, cuando una prenda sube de talla, simplemente le agrandan los hombros o las mangas en exceso, o le quitan largo, dejando un corte cuadrado que no sienta bien a nadie.",
      },
      {
        type: "paragraph",
        text: "En Camisas en Tallas Grandes (CTG), entendemos la anatomía de la contextura ancha. Por eso, tras años de experiencia e investigación, desarrollamos nuestro propio molde exclusivo: proporcional al cuerpo real, con hombros y mangas en su punto justo, cuello bajo y cómodo, un excelente largo que no se sale del pantalón y la suavidad inigualable del 100% algodón. Además, diseñamos nuestras camisas sin bolsillo en el pecho para ofrecer un estilo más limpio, moderno y elegante.",
      },
      {
        type: "heading2",
        text: "1. Las 3 medidas clave para elegir tu talla",
      },
      {
        type: "paragraph",
        text: "Para saber qué talla pedir en nuestra tienda, solo necesitas una cinta métrica y tomar estas 3 medidas principales sobre tu cuerpo (o sobre una camisa que te quede muy bien):",
      },
      {
        type: "list",
        items: [
          "1. Cuello: Rodea la base del cuello con la cinta métrica sin apretar. Deja el espacio de un dedo para garantizar total comodidad al abotonarlo.",
          "2. Pecho: Mide la parte más ancha del torso (por debajo de las axilas) manteniendo la cinta firme y recta.",
          "3. Largo: Mide desde el punto donde se une el cuello con el hombro hacia abajo. Nuestras prendas cuentan con un largo superior pensado para cubrir bien la zona del abdomen y mantenerse dentro del pantalón.",
        ],
      },
      {
        type: "image",
        imageSrc: "/images/blog/blog-3-medidas-clave.png",
        imageAlt: "Las tres medidas clave: Cuello, Pecho y Largo",
        caption: "Medición anatómica: cuello, pecho y largo para contexturas amplias.",
      },
      {
        type: "callout",
        text: "💡 Tip de la casa: Si tienes dudas entre dos tallas o prefieres un poco más de holgura en el área abdominal, fíjate también en la medida de la barriga en nuestra tabla oficial.",
      },
      {
        type: "heading2",
        text: "2. Tabla Oficial de Medidas - CTG",
      },
      {
        type: "paragraph",
        text: "Recuerda que nuestras tallas inician desde la 18.5 (2XL) en adelante. No manejamos tallas pequeñas convencionales como la M, L o XL.",
      },
      {
        type: "image",
        imageSrc: "/images/medidas/tabla-medidas-oficial.png",
        imageAlt: "Tabla Oficial de Medidas CTG Camisas en Tallas Grandes",
        caption: "Medidas exactas en centímetros (A: Largo, B: Pecho frontal, C: Barriga frontal, D: Mangas, E: Cuello).",
      },
      {
        type: "paragraph",
        text: "*Todas las medidas de pecho y barriga corresponden al ancho frontal de la prenda (de costura a costura extendida sobre una superficie plana).",
      },
      {
        type: "heading2",
        text: "3. La diferencia del Molde Exclusivo CTG",
      },
      {
        type: "paragraph",
        text: "Nuestras camisas no son de corte entallado (slim fit) ni tampoco son un cajón recto sin forma. Nuestro diseño propio ofrece:",
      },
      {
        type: "list",
        items: [
          "Elegancia sin rigidez: Acompaña la figura masculina de forma proporcional.",
          "Sin bolsillos en el pecho: Mantiene el pecho estilizado y libre de bultos innecesarios.",
          "Cuello bajo y cómodo: Pensado para no sofocar ni apretar la garganta.",
          "Sustancia y calidad: Confeccionadas en 100% algodón, garantizando máxima suavidad, frescura y resistencia en el día a día.",
        ],
      },
      {
        type: "image",
        imageSrc: "/images/blog/blog-molde-exclusivo.png",
        imageAlt: "Infografía La diferencia del Molde Exclusivo CTG",
        caption: "Pilares del diseño anatómico exclusivo de CTG.",
      },
      {
        type: "callout",
        text: "👉 Encuentra tu talla sin frustraciones ni errores. Ya no tienes que conformarte con ropa incómoda o sin forma. Elige con total confianza la camisa que realmente se adapte a tu estilo y contextura.",
      },
    ],
  },
  {
    slug: "5-errores-comunes-al-vestir-camisas-en-tallas-grandes",
    title: "5 Errores Comunes al Vestir Camisas en Tallas Grandes (y cómo evitarlos con el molde correcto)",
    excerpt:
      "Vestir en talla grande no es esconder el cuerpo con ropa cuadrada. Descubre los 5 errores más comunes y cómo el molde anatómico CTG los soluciona.",
    category: "Estilo y Calce",
    readingTime: "6 min de lectura",
    date: "14 Octubre, 2026",
    author: "Asesores de Estilo CTG",
    coverImage: "/images/blog/blog-5-errores-molde.png",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Vestir bien en tallas plus no se trata de esconder el cuerpo ni conformarse con lo que haya en la tienda. Se trata de proyectar una imagen impecable, segura y elegante utilizando prendas diseñadas exactamente para tu contextura.",
      },
      {
        type: "paragraph",
        text: "A lo largo de los años, hemos visto cómo muchos hombres cometen ciertos errores al elegir sus camisas. En la mayoría de los casos, la culpa no es de ellos, sino de las tiendas tradicionales que simplemente 'agrandan' una camisa de talla estándar en forma de cajón cuadrado.",
      },
      {
        type: "image",
        imageSrc: "/images/blog/blog-5-errores-molde.png",
        imageAlt: "Comparativa visual: Camisa Tradicional Agrandada vs Molde Propio Anatómico CTG",
        caption: "Error común vs Solución anatómica CTG en proporciones reales.",
      },
      {
        type: "heading2",
        text: "1. Usar camisas gigantescas pensando que disimulan el abdomen",
      },
      {
        type: "paragraph",
        text: "• El error: Elegir prendas excesivamente holgadas o cuadradas bajo la falsa idea de que taparán la barriga. Lo único que se logra es sumar volumen visual, arruinar la silueta y dar un aspecto desaliñado.",
      },
      {
        type: "paragraph",
        text: "• La solución: Usar una camisa con ajuste proporcional. Nuestro molde exclusivo acompaña la figura de forma anatómica: te brinda la holgura ideal en el abdomen (sin apretar los botones) mientras mantiene la estructura en el pecho y la espalda.",
      },
      {
        type: "heading2",
        text: "2. Dejar que los hombros y las mangas caigan demasiado",
      },
      {
        type: "paragraph",
        text: "• El error: Comprar una camisa tradicional donde, para que te cierre el torso, la costura del hombro termina a mitad del brazo y las mangas parecen un paracaídas.",
      },
      {
        type: "paragraph",
        text: "• La solución: Buscar ropa que diferencie la caída de los hombros respecto al ancho del pecho. En CTG, nuestras mangas y hombros están diseñados en su medida justa (desde la talla 18.5 / 2XL) para que los brazos no se vean excesivamente anchos ni la prenda parezca prestada.",
      },
      {
        type: "heading2",
        text: "3. Usar cuellos rígidos o demasiado altos que ahogan",
      },
      {
        type: "paragraph",
        text: "• El error: Abotonarse el cuello de una camisa convencional y sentir que sofoca o aprieta la garganta durante toda la jornada.",
      },
      {
        type: "paragraph",
        text: "• La solución: Apostar por camisas con cuello bajo y cómodo. Este detalle, propio de nuestras prendas, ofrece un espacio confortable alrededor del cuello que permite respirar con tranquilidad tanto si usas corbata como si prefieres llevar el primer botón abierto.",
      },
      {
        type: "heading2",
        text: "4. Usar camisas cortas que se salen del pantalón",
      },
      {
        type: "paragraph",
        text: "• El error: Agacharse, sentarse o levantar los brazos y que la camisa se salga inmediatamente del pantalón, mostrando la zona lumbar o abdominal.",
      },
      {
        type: "paragraph",
        text: "• La solución: Exigir un largo superior. Diseñamos nuestras prendas con un excelente largo delantero y posterior pensado estratégicamente para cubrir la zona del abdomen y mantenerse fija dentro del pantalón durante todo el día.",
      },
      {
        type: "heading2",
        text: "5. Llevar bolsillos en el pecho que suman bulto innecesario",
      },
      {
        type: "paragraph",
        text: "• El error: Usar camisas de vestir con bolsillos delanteros que se deforman con el peso de un teléfono o simplemente generan volumen visual en la zona pectoral.",
      },
      {
        type: "paragraph",
        text: "• La solución: Optar por un pecho limpio sin bolsillos. Al eliminar el bolsillo del pecho, la tela de 100% algodón cae de forma mucho más estilizada, moderna y limpia, dándole un toque de distinción al instante.",
      },
      {
        type: "callout",
        text: "La diferencia de vestir con tu talla real: Ya no tienes por qué elegir entre comodidad y elegancia. Con nuestro molde propio desarrollado exclusivamente para hombres de contextura ancha, vestir bien es más fácil que nunca.",
      },
    ],
  },
  {
    slug: "donde-comprar-camisas-tallas-grandes-lima-peru",
    title: "¿Dónde comprar camisas de vestir y casuales en tallas grandes en Lima y en todo el Perú?",
    excerpt:
      "Conoce nuestra tienda especializada en Miraflores y la cobertura de envíos seguros a todo el Perú por Shalom y Olva Courier.",
    category: "Guía de Compra",
    readingTime: "5 min de lectura",
    date: "14 Octubre, 2026",
    author: "Atención al Cliente CTG",
    coverImage: "/images/blog/blog-donde-comprar-info.png",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Para un hombre de contextura ancha, encontrar una camisa elegante, cómoda y con buen ajuste en Perú suele ser una tarea pesada. Las tiendas por departamento tradicionales suelen ofrecer pocas opciones en tallas plus, y cuando las tienen, presentan un gran problema: son camisas de corte 'cajón' cuadradas, con mangas gigantes, cuellos ajustados que ahogan y un largo tan corto que se sale del pantalón a la menor oportunidad.",
      },
      {
        type: "image",
        imageSrc: "/images/blog/blog-donde-comprar-mapa.png",
        imageAlt: "Mapa de compras en Lima y provincias de Perú - CTG",
        caption: "Solución exclusiva desde la talla 18.5 (2XL) hasta 22.5 (6XL).",
      },
      {
        type: "heading2",
        text: "La solución hecha a la medida del hombre peruano",
      },
      {
        type: "paragraph",
        text: "En CTG no importamos moldes genéricos ni agrandamos prendas estándar sin criterio. Durante años hemos perfeccionado un molde anatómico propio pensado en la anatomía real de los hombres con espalda ancha o tórax prominente.",
      },
      {
        type: "list",
        items: [
          "Tallas Reales: Trabajamos exclusivamente a partir de la talla 18.5 (2XL) hasta la 22.5.",
          "Ajuste Proporcional: Hombros y mangas en su punto justo, evitando la tela sobrante.",
          "Cuello Bajo y cómodo: Diseñado para abotonarse sin sofocar la garganta.",
          "Largo Superior: Un excelente largo delantero y posterior para que la camisa jamás se salga de tu pantalón.",
          "Estilo Limpio: Sin bolsillo en el pecho para un acabado más estilizado y moderno.",
          "100% Algodón: Máxima suavidad, frescura y caída natural para el clima de nuestro país.",
        ],
      },
      {
        type: "image",
        imageSrc: "/images/blog/blog-donde-comprar-info.png",
        imageAlt: "Ubicación estratégica en Miraflores y Envíos a todo el Perú",
        caption: "Atención en Miraflores y despachos con Shalom, Olva Courier y más.",
      },
      {
        type: "heading2",
        text: "Ubicación estratégica y cobertura nacional",
      },
      {
        type: "heading3",
        text: "Visítanos o coordina tu entrega en Lima",
      },
      {
        type: "paragraph",
        text: "Si estás en Lima, nuestra ubicación estratégica se encuentra en Av. Larco 812, Oficina / Tienda 201, Miraflores, un distrito seguro, turístico y muy céntrico dentro de Lima Metropolitana. Esto nos permite coordinar entregas rápidas y seguras a todos los distritos (Miraflores, San Isidro, Surco, San Borja, Los Olivos, San Miguel, La Molina y más), garantizando que tu compra llegue a tiempo.",
      },
      {
        type: "heading3",
        text: "Envíos a todo el Perú (Provincias)",
      },
      {
        type: "paragraph",
        text: "Despachamos diariamente a todas las regiones del país (Arequipa, Trujillo, Cusco, Piura, Huancayo, Chiclayo y más). Trabajamos con las agencias más confiables como Shalom, Olva Courier o cualquier otra empresa de transporte de tu elección para tu mayor tranquilidad. Recibirás tu comprobante y número de seguimiento para monitorear tu pedido en tiempo real.",
      },
      {
        type: "callout",
        text: "📱 Para mayores detalles o asesoría personalizada, comunícate directamente con nuestro equipo vía WhatsApp: 970 298 099.",
      },
    ],
  },
  {
    slug: "guia-de-cuidado-camisa-100-algodon-como-nueva",
    title: "Guía de Cuidado: Cómo mantener tu camisa de 100% Algodón CTG como nueva",
    excerpt:
      "Consejos expertos para lavar en agua fría, secar a la sombra sin deformaciones y planchar al vapor tus camisas de puro algodón peruano.",
    category: "Cuidado de Prendas",
    readingTime: "4 min de lectura",
    date: "14 Octubre, 2026",
    author: "Taller Textil CTG",
    coverImage: "/images/blog/blog-cuidado-lavado.png",
    featured: false,
    content: [
      {
        type: "paragraph",
        text: "Comprar una camisa de CTG es una inversión en elegancia y comodidad. Te has llevado una prenda confeccionada con nuestro propio molde anatómico, un cuello bajo cómodo y un largo superior diseñado para mantenerse dentro del pantalón. Además, está hecha de 100% algodón, la fibra natural por excelencia que ofrece máxima suavidad y frescura.",
      },
      {
        type: "paragraph",
        text: "Sin embargo, el algodón es una fibra natural que requiere cuidados específicos para no encoger, perder color o deformarse. Si quieres que tu camisa favorita te acompañe por años manteniendo el mismo ajuste del primer día, sigue esta guía esencial de cuidado:",
      },
      {
        type: "image",
        imageSrc: "/images/blog/blog-cuidado-lavado.png",
        imageAlt: "Infografía Lavado ideal agua fría y secado al aire libre a la sombra",
        caption: "Consejos clave: Agua fría 30°C, secado al aire libre y evitar la secadora.",
      },
      {
        type: "heading2",
        text: "1. El Lavado: El secreto está en la temperatura",
      },
      {
        type: "paragraph",
        text: "El enemigo número uno del algodón es el calor excesivo durante el lavado. Las altas temperaturas relajan las fibras y provocan el temido encogimiento.",
      },
      {
        type: "list",
        items: [
          "Agua Fría siempre: Lava tus camisas a mano o en la lavadora utilizando agua fría (máximo 30°C). Esto protege el tamaño real de la prenda y los colores.",
          "Ciclo Delicado: Si usas lavadora, elige un ciclo de lavado suave o delicado. Las camisas CTG no tienen bolsillo de pecho, lo que reduce los bultos, pero el frotado excesivo puede dañar las fibras.",
          "Separa Colores: Lava las camisas blancas por separado de las de color para evitar transferencias y mantener los tonos vibrantes.",
        ],
      },
      {
        type: "heading2",
        text: "2. El Secado: Evita la secadora a toda costa",
      },
      {
        type: "paragraph",
        text: "Aunque es rápida, la secadora es muy agresiva con el algodón. El calor intenso y el movimiento brusco debilitan las costuras, encogen la prenda y pueden deformar el cuello.",
      },
      {
        type: "list",
        items: [
          "Secado al Aire Libre: Es la mejor opción. Sacude la camisa suavemente después de lavarla para reducir arrugas y cuélgala en una percha de plástico o madera.",
          "A la sombra: Tiende la ropa en un lugar ventilado donde no incida la luz del sol de forma directa. El sol fuerte debilita las fibras y decolora las camisas, especialmente las oscuras.",
        ],
      },
      {
        type: "heading2",
        text: "3. El Planchado: Ligeramente húmeda para un acabado impecable",
      },
      {
        type: "paragraph",
        text: "Nuestras camisas de 100% algodón tienen una caída natural, pero el planchado es necesario para un aspecto totalmente pulcro.",
      },
      {
        type: "list",
        items: [
          "Plancha a Vapor: Utiliza una plancha con buen vapor a temperatura media-alta (específica para algodón).",
          "Mejor si está húmeda: El planchado es mucho más fácil y rápido si la camisa está ligeramente húmeda. Si ya se secó por completo, usa el atomizador de agua de la plancha.",
          "Cuidado con el cuello: Nuestro cuello bajo y cómodo está diseñado para no sofocar, pero requiere un planchado suave. Plancha primero el reverso y luego el derecho, sin presionar demasiado para no marcar los bordes.",
        ],
      },
      {
        type: "heading2",
        text: "4. Consejos Extra para Alargar la Vida de tu Camisa",
      },
      {
        type: "list",
        items: [
          "Ataca las manchas rápido: Actúa inmediatamente sobre cualquier mancha (café, vino, desodorante). Enjuaga con agua fría y aplica un quitamanchas suave antes de lavar. Evita la lejía en las camisas blancas, ya que amarillea el algodón.",
          "Usa perchas adecuadas: En el armario, cuelga tus camisas en perchas que se ajusten al ancho de los hombros para evitar deformaciones.",
        ],
      },
      {
        type: "callout",
        text: "Vístete con confianza, cuida con criterio. Tu camisa CTG está hecha para durar. Siguiendo estos sencillos pasos, mantendrás intacto ese calce distinguido por años.",
      },
    ],
  },
  {
    slug: "camisas-casuales-tallas-grandes-estilo-remangado",
    title: "Camisas Casuales en Tallas Grandes: El Poder del Estilo Remangado, Cuadros y Colores Vivos",
    excerpt:
      "Por qué preferimos la manga larga remangada frente a la manga corta y cómo lucir estampados a cuadros con estilo y porte ordenado.",
    category: "Moda y Tendencias",
    readingTime: "5 min de lectura",
    date: "14 Octubre, 2026",
    author: "Diseño & Confección CTG",
    coverImage: "/images/blog/blog-casual-presencia.png",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Para el hombre de contextura ancha, vestir casual no significa perder la presencia ni verse desordenado. Existe la falsa creencia de que para los fines de semana o días de calor la única opción es la manga corta o prendas oscuras y apagadas.",
      },
      {
        type: "paragraph",
        text: "En Camisas en Tallas Grandes (CTG) defendemos una filosofía clara: el orden nos da presencia en todo momento. Por eso, nuestra línea casual está diseñada en manga larga confeccionada en 100% algodón, con estampados a cuadros y colores llamativos pensados para llevarse con las mangas remangadas, logrando un balance perfecto entre frescura, estructura y elegancia.",
      },
      {
        type: "image",
        imageSrc: "/images/blog/blog-casual-presencia.png",
        imageAlt: "Comparación: Orden y Estilo CTG Mangas Remangadas vs Desorden / Sin Forma Manga Corta",
        caption: "El poder del remangado estructurado: estiliza el antebrazo y enmarca los hombros.",
      },
      {
        type: "heading2",
        text: "1. ¿Por qué preferimos la manga larga remangada frente a la manga corta?",
      },
      {
        type: "paragraph",
        text: "Llevar una camisa de manga larga remangada al antebrazo aporta ventajas estéticas incomparables para la contextura robusta:",
      },
      {
        type: "list",
        items: [
          "Enmarca y estiliza la figura: Remangar la camisa a la altura del antebrazo estiliza los brazos y aporta una imagen dinámica, ejecutiva y ordenada.",
          "Estructura en los hombros: Nuestro molde exclusivo asegura que la costura del hombro quede en su punto exacto, sin colgar ni hacer efecto 'cajón'.",
          "Versatilidad total: Te permite adaptarte rápidamente: mangas abajo si refresca la tarde o remangadas con estilo para una reunión informal o el fin de semana.",
        ],
      },
      {
        type: "heading2",
        text: "2. Cuadros y colores llamativos: Pierde el miedo al color",
      },
      {
        type: "paragraph",
        text: "Muchos hombres plus size se limitan al negro o gris por temor a ganar volumen. Con el molde y patrón correcto, el color y los cuadros juegan a tu favor:",
      },
      {
        type: "list",
        items: [
          "Telas a cuadros proporcionadas: Diseños modernos que aportan personalidad sin saturar la figura.",
          "Colores vivos y frescos: Tonos que proyectan seguridad y energía para tus salidas o eventos de día.",
          "Pecho limpio sin bolsillos: Al no llevar bolsillo en el pecho, los patrones a cuadros y los colores lucen impecables, sin cortes visuales extra ni bultos molestos.",
        ],
      },
      {
        type: "heading2",
        text: "3. La comodidad de nuestro Molde Exclusivo CTG (Tallas 18.5 / 2XL a 22.5)",
      },
      {
        type: "list",
        items: [
          "100% Algodón de primera calidad: Suavidad al tacto y máxima frescura transpirable durante todo el día.",
          "Cuello bajo y cómodo: Pensado para usarse desabotonado con total naturalidad y sin sensación de ahogo.",
          "Largo superior: Diseñado para cubrir la zona abdominal, permitiendo que la lleves por dentro o suelta por fuera manteniendo una caída limpia.",
          "Mangas sin exceso de tela: El ancho justo de brazo para que al remangar la camisa la tela no forme un bulto grueso ni incómodo.",
        ],
      },
      {
        type: "heading2",
        text: "4. Cómo armar un look casual con presencia",
      },
      {
        type: "list",
        items: [
          "Fin de semana con estilo: Camisa casual a cuadros en tonos vivos, mangas remangadas a la altura del codo, sobre un jean clásico u oscuro y zapatillas de cuero o mocasines.",
          "Casual de oficina / Reunión informal: Camisa en color llamativo entero, cuello relajado, combinada con un pantalón tipo chino (beige o azul) y zapatos casuales.",
        ],
      },
      {
        type: "callout",
        text: "Viste con orden, comodidad y distinción. Luce tu talla real con prendas diseñadas para tu contextura. Descubre el catálogo casual de CTG y marca la diferencia con un estilo moderno y estructurado.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}
