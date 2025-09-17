import { Product } from '../interfaces/product.interface';

interface SeedData {
  products: Product[]
}

export const initialData: SeedData = {
  products: [
    // ===== PRODUCTOS PS5 =====
    {
      name: 'The Last of Us Part  Remastered',
      description: 'Experimenta la aclamada historia de Ellie y Abby en su versión remasterizada para PlayStation 5, con mejoras gráficas, tiempos de carga reducidos y un nuevo modo de juego Sin Retorno.',
      images: [
        '1740176-00-A_0_2000.jpg',
        '1740176-00-A_1.jpg',
      ],
      inStock: 15,
      msrp: 69.99,
      slug: 'the_last_of_us_part_ii_remastered_ps5',
      tags: ['singleplayer', 'story-rich', 'exclusive'],
      genre: 'action', // Género real del juego
      platform: 'ps5', // Plataforma
      category: 'ps5' // Para filtrar por consola
    },

    {
      name: 'Spider-Man: Miles Morales Ultimate Edition',
      description: 'Experimenta el poder de Spider-Man con Miles Morales en esta edición definitiva que incluye el juego completo de Spider-Man Remastered.',
      images: [
        '1.png',
        '1740507-00-A_1.jpg',
      ],
      inStock: 12,
      msrp: 79.99,
      slug: 'spider_man_miles_morales_ultimate_ps5',
      tags: ['action', 'superhero', 'exclusive', 'open-world'],
      genre: 'action', // Género real del juego
      platform: 'ps5',
      category: 'ps5'
    },
    {
      name: 'Demon\'s Souls',
      description: 'Experimenta el desafiante mundo de Demon\'s Souls completamente reconstruido desde cero para PlayStation 5 con gráficos impresionantes.',
      images: [
        '2.png',
        '1740250-00-A_1.jpg'
      ],
      inStock: 8,
      msrp: 69.99,
      slug: 'demons_souls_ps5',
      tags: ['souls-like', 'challenging', 'exclusive', 'rpg'],
      genre: 'rpg', // Género real del juego
      platform: 'ps5',
      category: 'ps5'
    },
    {
      name: 'Ratchet & Clank: Rift Apart',
      description: 'Únete a Ratchet y Clank en una aventura interdimensional con gráficos increíbles y carga instantánea entre mundos.',
      images: [
        '1740280-00-A_0_2000.jpg',
        '1740280-00-A_1.jpg',
      ],
      inStock: 10,
      msrp: 69.99,
      slug: 'ratchet_clank_rift_apart_ps5',
      tags: ['platformer', 'family-friendly', 'exclusive', 'sci-fi'],
      genre: 'platformer', // Género real del juego
      platform: 'ps5',
      category: 'ps5'
    },
    {
      name: 'Horizon Forbidden West',
      description: 'Continúa la épica aventura de Aloy en un mundo post-apocalíptico lleno de máquinas peligrosas y misterios por descubrir.',
      images: [
        '1741416-00-A_0_2000.jpg',
        '1741416-00-A_1.jpg',
      ],
      inStock: 14,
      msrp: 79.99,
      slug: 'horizon_forbidden_west_ps5',
      tags: ['open-world', 'rpg', 'exclusive', 'action-adventure'],
      genre: 'adventure', // Género real del juego
      platform: 'ps5',
      category: 'ps5'
    },

    // ===== PRODUCTOS PS2 =====
    {
      name: 'Grand Theft Auto: San Andreas',
      description: 'Experimenta la épica historia de CJ en Los Santos en este clásico de PlayStation 2 que definió una generación.',
      images: [
        '7654393-00-A_2_2000.jpg',
        '7654393-00-A_3.jpg',
      ],
      inStock: 5,
      msrp: 19.99,
      slug: 'gta_san_andreas_ps2',
      tags: ['classic', 'open-world', 'action', 'retro'],
      genre: 'action', // Género real del juego
      platform: 'ps2',
      category: 'ps2'
    },
    {
      name: 'God of War',
      description: 'La brutal aventura de Kratos en su búsqueda de venganza contra los dioses del Olimpo. Un clásico de PlayStation 2.',
      images: [
        '1703767-00-A_0_2000.jpg',
        '1703767-00-A_1.jpg',
      ],
      inStock: 8,
      msrp: 24.99,
      slug: 'god_of_war_ps2',
      tags: ['classic', 'mythology', 'action', 'hack-and-slash'],
      genre: 'action', // Género real del juego
      platform: 'ps2',
      category: 'ps2'
    },
    {
      name: 'Final Fantasy X',
      description: 'Vive la emotiva historia de Tidus y Yuna en este JRPG clásico con una narrativa inolvidable.',
      images: [
        '1657891-00-A_0_2000.jpg',
        '1657891-00-A_1.jpg',
      ],
      inStock: 8,
      msrp: 29.99,
      slug: 'final_fantasy_x_ps2',
      tags: ['classic', 'jrpg', 'story-rich', 'turn-based'],
      genre: 'rpg', 
      platform: 'ps2',
      category: 'ps2'
    },
    {
      name: 'Shadow of the Colossus',
      description: 'Una obra maestra artística donde debes derrotar a colosales criaturas en paisajes épicos y melancólicos.',
      images: [
        '1657914-00-A_0_2000.jpg',
        '1657914-00-A_1.jpg',
      ],
      inStock: 8,
      msrp: 22.99,
      slug: 'shadow_of_the_colossus_ps2',
      tags: ['classic', 'artistic', 'boss-battles', 'atmospheric'],
      genre: 'adventure', // Género real del juego
      platform: 'ps2',
      category: 'ps2'
    },
    {
      name: 'Metal Gear Solid 3: Snake Eater',
      description: 'La precuela definitiva de la saga Metal Gear con infiltración táctica y una historia épica durante la Guerra Fría.',
      images: [
        '1657915-00-A_0_2000.jpg',
        '1657915-00-A_1.jpg',
      ],
      inStock: 8,
      msrp: 26.99,
      slug: 'metal_gear_solid_3_ps2',
      tags: ['classic', 'stealth', 'tactical', 'story-rich'],
      genre: 'stealth', // Género real del juego
      platform: 'ps2',
      category: 'ps2'
    },

    // ===== PRODUCTOS PS1 =====
  
    {
      name: 'Metal Gear Solid',
      description: 'El juego que revolucionó el género stealth. Infiltrate en Shadow Moses Island como Solid Snake.',
      images: [
        'metalGearSolid1.png',
        'metalGear21.png',
      ],
      inStock: 8,
      msrp: 16.99,
      slug: 'metal_gear_solid_ps1',
      tags: ['classic', 'stealth', 'revolutionary', 'tactical'],
      genre: 'stealth', // Género real del juego
      platform: 'ps1',
      category: 'ps1'
    },

    {
      name: 'Resident Evil 2',
      description: 'Survival horror en su máxima expresión. Escapa de Raccoon City con Leon Kennedy o Claire Redfield.',
      images: [
        'resident2.png',
        '2.png',
      ],
      inStock: 4,
      msrp: 18.99,
      slug: 'resident_evil_2_ps1',
      tags: ['classic', 'survival-horror', 'zombies', 'atmospheric'],
      genre: 'horror', // Género real del juego
      platform: 'ps1',
      category: 'ps1'
    },
    {
      name: 'Crash Bandicoot 3: Warped',
      description: 'El marsupial más famoso de PlayStation en su aventura más épica a través del tiempo y el espacio.',
      images: [
        'crash.png',
        'crash3disco1.png',
      ],
      inStock: 5,
      msrp: 12.99,
      slug: 'crash_bandicoot_3_ps1',
      tags: ['classic', 'platformer', 'family-friendly', 'mascot'],
      genre: 'platformer',
      platform: 'ps1',
      category: 'ps1'
    },

    {
      name: 'Final Fantasy VII',
      description: 'El JRPG que cambió todo. Acompaña a Cloud y sus aliados en su lucha contra Shinra y Sephiroth en Midgar.',
      images: [
        'finalFantasyvii.png',
        'finalFantasy.png',
      ],
      inStock: 8,
      msrp: 14.99,
      slug: 'final_fantasy_vii_ps1',
      tags: ['classic', 'jrpg', 'legendary', 'turn-based'],
      genre: 'rpg',
      platform: 'ps1',
      category: 'ps1'
    },

    {
      name: 'Tekken 3',
      description: 'El mejor juego de lucha de la era PlayStation. Combates intensos con los mejores luchadores del mundo.',
      images: [
        'tekken3.png',
        'tekken3h1.png',
      ],
      inStock: 6,
      msrp: 13.99,
      slug: 'tekken_3_ps1',
      tags: ['classic', 'fighting', 'multiplayer', 'arcade'],
      genre: 'fighting',
      platform: 'ps1',
      category: 'ps1'
    },
    {
      name: 'Crash Bandicoot 3: Warped - Collector Edition',
      description: 'El marsupial más famoso de PlayStation en su aventura más épica a través del tiempo y el espacio. Edición de coleccionista.',
      images: [
        'crash.png',
        'crash3disco1.png',
      ],
      inStock: 3,
      msrp: 15.99,
      slug: 'crash_bandicoot_3_collector_ps1',
      tags: ['classic', 'platformer', 'family-friendly', 'mascot', 'collector'],
      genre: 'platformer',
      platform: 'ps1',
      category: 'ps1'
    },
    {
      name: 'Tekken 3 - Tournament Edition',
      description: 'El mejor juego de lucha de la era PlayStation. Edición especial con personajes desbloqueados.',
      images: [
        'tekken3.png',
        'tekken3h1.png',
      ],
      inStock: 4,
      msrp: 16.99,
      slug: 'tekken_3_tournament_ps1',
      tags: ['classic', 'fighting', 'multiplayer', 'arcade', 'tournament'],
      genre: 'fighting',
      platform: 'ps1',
      category: 'ps1'
    },
    {
      name: 'Final Fantasy VII - International Version',
      description: 'El JRPG que cambió todo. Versión internacional con contenido adicional y mejoras.',
      images: [
        'finalFantasyvii.png',
        'finalFantasy.png',
      ],
      inStock: 6,
      msrp: 17.99,
      slug: 'final_fantasy_vii_international_ps1',
      tags: ['classic', 'jrpg', 'legendary', 'turn-based', 'international'],
      genre: 'rpg',
      platform: 'ps1',
      category: 'ps1'
    },
    {
      name: 'Resident Evil 2 - Dual Shock Version',
      description: 'Survival horror en su máxima expresión. Versión mejorada con soporte para DualShock.',
      images: [
        'resident2.png',
        '2.png',
      ],
      inStock: 5,
      msrp: 21.99,
      slug: 'resident_evil_2_dualshock_ps1',
      tags: ['classic', 'survival-horror', 'zombies', 'atmospheric', 'enhanced'],
      genre: 'horror',
      platform: 'ps1',
      category: 'ps1'
    }
  ]
}
