import * as THREE from 'three'
import type { CityNode, ProcessedNodeData } from '@/types/city'
import { COLORS } from './constants'

// ========== TWORZENIE GEOMETRII ==========
export function createBuilding(
  node: CityNode, 
  nodeData: ProcessedNodeData, 
  x: number, 
  y: number, 
  z: number,
  objectMap: Map<any, any>
): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(nodeData.width, nodeData.height, nodeData.depth);
    const material = new THREE.MeshPhongMaterial({ 
        color: COLORS.building,
        emissive: COLORS.buildingEmissive
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + nodeData.height / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    mesh.userData = { name: node.name, isSelectable: true, type: 'building' };
    objectMap.set(mesh, node);
    
    addEdges(mesh, geometry, COLORS.edge, 1);
    
    return mesh;
}

export function createPlatform(
  node: CityNode, 
  nodeData: ProcessedNodeData, 
  x: number, 
  y: number, 
  z: number,
  objectMap: Map<any, any>
): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(nodeData.width, nodeData.height, nodeData.depth);
    const material = new THREE.MeshPhongMaterial({ 
        color: COLORS.platform,
        emissive: COLORS.platformEmissive
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + nodeData.height / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.userData = { name: node.name, isSelectable: true, type: 'platform' };
    objectMap.set(mesh, node);
    
    addEdges(mesh, geometry, COLORS.edge, 2);
    
    return mesh;
}

export function addEdges(
  mesh: THREE.Mesh, 
  geometry: THREE.BoxGeometry, 
  color: number, 
  linewidth: number
): void {
    const edges = new THREE.EdgesGeometry(geometry);
    const positions = edges.attributes.position.array;
    const filteredPositions: number[] = [];
    
    // Znajdź minimalną wartość Y
    let minY = Infinity;
    for (let i = 1; i < positions.length; i += 3) {
        minY = Math.min(minY, positions[i]);
    }
    
    // Dodaj tylko te krawędzie, które nie są na dole
    const tolerance = 0.001;
    for (let i = 0; i < positions.length; i += 6) {
        const y1 = positions[i + 1];
        const y2 = positions[i + 4];
        
        // Dodaj krawędź tylko jeśli oba punkty nie są na dole
        if (Math.abs(y1 - minY) > tolerance || Math.abs(y2 - minY) > tolerance) {
            filteredPositions.push(
                positions[i], positions[i + 1], positions[i + 2],
                positions[i + 3], positions[i + 4], positions[i + 5]
            );
        }
    }
    
    const filteredGeometry = new THREE.BufferGeometry();
    filteredGeometry.setAttribute(
        'position', 
        new THREE.Float32BufferAttribute(filteredPositions, 3)
    );
    
    const lineMaterial = new THREE.LineBasicMaterial({ color, linewidth });
    const wireframe = new THREE.LineSegments(filteredGeometry, lineMaterial);
    mesh.add(wireframe);
}

export function createGeometry(
  node: CityNode, 
  nodeData: ProcessedNodeData, 
  x: number = 0, 
  y: number = 0, 
  z: number = 0,
  objectMap: Map<any, any>
): THREE.Group {
    const group = new THREE.Group();

    // Jeśli to plik - tworzymy budynek
    if (node.height !== undefined && node.width !== undefined) {
        const building = createBuilding(node, nodeData, x, y, z, objectMap);
        group.add(building);
        return group;
    }

    // Jeśli to folder - tworzymy platformę i dzieci
    if (node.children !== undefined) {
        const platform = createPlatform(node, nodeData, x, y, z, objectMap);
        group.add(platform);

        node.children.forEach((child, index) => {
            const pos = nodeData.positions[index];
            const childX = x - nodeData.width / 2 + pos.x;
            const childZ = z - nodeData.depth / 2 + pos.z;
            const childY = y + nodeData.height;
            
            const childGroup = createGeometry(child, nodeData.children[index], childX, childY, childZ, objectMap);
            group.add(childGroup);
        });
    }

    return group;
}