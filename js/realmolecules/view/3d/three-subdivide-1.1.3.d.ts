// Copyright 2026, University of Colorado Boulder

/**
 * Type definitions for the main interface for three-subdivide, so we can use it in properly-typed ways in the
 * sim code.
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

/* eslint-disable @typescript-eslint/consistent-type-definitions */

export {};

declare global {
  /**
   * Global attached by the script:
   *   window.ThreeLoopSubdivision = LoopSubdivision;
   */
  interface Window {
    ThreeLoopSubdivision: typeof LoopSubdivision;
  }

  /**
   * Optional parameter object accepted by LoopSubdivision.modify/flat/smooth.
   */
  interface LoopSubdivisionParams {
    /**
     * Should coplanar faces be divided along shared edges before running Loop subdivision?
     * Default: true (only used by modify)
     */
    split?: boolean;

    /**
     * Should UV values be averaged during subdivision?
     * Default: false
     */
    uvSmooth?: boolean;

    /**
     * Should edges / breaks in geometry be ignored during subdivision?
     * Default: false
     */
    preserveEdges?: boolean;

    /**
     * If true, subdivision generates triangles, but does not modify positions.
     * Default: false (only used by modify)
     */
    flatOnly?: boolean;

    /**
     * If geometry contains more than this many triangles, subdivision will not continue.
     * Default: Infinity (only used by modify)
     */
    maxTriangles?: number;

    /**
     * How much to weigh favoring heavy corners vs favoring Loop's formula.
     * Clamped to [0, 1]. Default: 1
     */
    weight?: number;
  }

  /**
   * Loop subdivision surface modifier for use with modern three.js BufferGeometry.
   *
   * Notes (as implemented):
   * - Returns a NEW BufferGeometry (does not dispose the input)
   * - Output is NonIndexed
   * - Will compute normals on input if missing
   */
  class LoopSubdivision {
    /**
     * Applies Loop subdivision modifier to geometry.
     *
     * @param bufferGeometry Three.js geometry to be subdivided
     * @param iterations How many times to run subdivision (default 1)
     * @param params Optional parameters object
     * @returns New subdivided BufferGeometry
     */
    public static modify(
      bufferGeometry: THREE.BufferGeometry,
      iterations?: number,
      params?: LoopSubdivisionParams
    ): THREE.BufferGeometry;

    /**
     * Applies one iteration of split subdivision.
     * Splits all triangles at edges shared by coplanar triangles.
     *
     * @param geometry Input geometry (indexed or non-indexed)
     * @returns New non-indexed BufferGeometry
     */
    public static edgeSplit( geometry: THREE.BufferGeometry ): THREE.BufferGeometry;

    /**
     * Applies one iteration of Loop (flat) subdivision (1 triangle -> 4 triangles)
     * without point averaging.
     *
     * @param geometry Input geometry (indexed or non-indexed)
     * @param params Optional parameters (currently only uvSmooth/preserveEdges are read by smooth; flat uses none)
     * @returns New non-indexed BufferGeometry
     */
    public static flat(
      geometry: THREE.BufferGeometry,
      params?: LoopSubdivisionParams
    ): THREE.BufferGeometry;

    /**
     * Lower-level helper used by flat() to generate a subdivided attribute.
     *
     * @param attribute Source attribute
     * @param vertexCount existing.attributes.position.count
     * @param params Optional parameters
     */
    public static flatAttribute(
      attribute: THREE.BufferAttribute | THREE.InterleavedBufferAttribute,
      vertexCount: number,
      params?: LoopSubdivisionParams
    ): THREE.BufferAttribute;

    /**
     * Applies one iteration of Loop (smooth) subdivision (1 triangle -> 4 triangles)
     * with point averaging.
     *
     * @param geometry Input geometry (indexed or non-indexed)
     * @param params Optional parameters (uvSmooth, preserveEdges, weight are used)
     * @returns New non-indexed BufferGeometry
     */
    public static smooth(
      geometry: THREE.BufferGeometry,
      params?: LoopSubdivisionParams
    ): THREE.BufferGeometry;
  }
}