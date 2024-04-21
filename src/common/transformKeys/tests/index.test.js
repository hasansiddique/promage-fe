import 'jest-enzyme';
import transformKeys from '../index';

describe('Transform Keys', () => {
  test('should return null if null is passed to toCamelCase', () => {
    const data = transformKeys.toCamelCase(null);
    expect(data).toEqual(null);
  });
  test('should return strings as it is when called with toSnakeCase for null value', () => {
    const data = transformKeys.toSnakeCase(null);
    expect(data).toEqual(null);
  });
  test('should return undefined if undefined is passed to toCamelCase', () => {
    const data = transformKeys.toCamelCase(undefined);
    expect(data).toEqual(undefined);
  });
  test('should return return undefined if undefined is passed to toSnakeCase', () => {
    const data = transformKeys.toSnakeCase(undefined);
    expect(data).toEqual(undefined);
  });
  test('should return strings as it is when called with toCamelCase', () => {
    const data = transformKeys.toCamelCase('sometext');
    expect(data).toEqual('sometext');
  });
  test('should return strings as it is when called with toSnakeCase', () => {
    const data = transformKeys.toSnakeCase('sometext');
    expect(data).toEqual('sometext');
  });
  test('should return strings as it is when called with toSnakeCase and it is an array of strings', () => {
    const data = transformKeys.toSnakeCase(['sometext']);
    expect(data).toEqual(['sometext']);
  });
  test('should return array of objects in snakecase', () => {
    const data = transformKeys.toSnakeCase([{ userId: 'sometext' }]);
    expect(data).toEqual([{ user_id: 'sometext' }]);
  });
  test('should transform array to camelcase', () => {
    const snakeCaseArray = [
      { some_name: 'someName1', some_object: { object_id: 9, object_name: 'objectname1' } },
      { some_name: 'someName2', some_object: { object_id: 10, object_name: 'objectname2' } },
    ];
    const data = transformKeys.toCamelCase(snakeCaseArray);
    expect(data).toEqual([
      { someName: 'someName1', someObject: { objectId: 9, objectName: 'objectname1' } },
      { someName: 'someName2', someObject: { objectId: 10, objectName: 'objectname2' } },
    ]);
  });
  test('should transform array to snake case', () => {
    const snakeCaseArray = [
      { someName: 'someName1', someObject: { objectId: 9, object5000: 'objectname1' } },
      { someName: 'someName2', someObject: { objectId: 10, objectName: 'objectname2' } },
    ];
    const data = transformKeys.toSnakeCase(snakeCaseArray);
    expect(data).toEqual([
      { some_name: 'someName1', some_object: { object_id: 9, object_5000: 'objectname1' } },
      { some_name: 'someName2', some_object: { object_id: 10, object_name: 'objectname2' } },
    ]);
  });

  test('should transform object to camelcase', () => {
    const snakeCaseArray = {
      some_name: 'someName1', some_object: { object_id: 9, object_name: 'objectname1' },
    };
    const data = transformKeys.toCamelCase(snakeCaseArray);
    expect(data).toEqual({
      someName: 'someName1', someObject: { objectId: 9, objectName: 'objectname1' },
    });
  });

  test('should transform object to snakecase', () => {
    const snakeCaseArray = {
      someName: 'someName1', someObject: { objectId: 9, objectName: 'objectname1' },
    };
    const data = transformKeys.toSnakeCase(snakeCaseArray);
    expect(data).toEqual({
      some_name: 'someName1', some_object: { object_id: 9, object_name: 'objectname1' },
    });
  });

  test('should transform gpuG1 object to snakecase', () => {
    const snakeCaseArray = {
      gpuG1: 5, someObject: { objectId: 9, objectName: 'objectname1' },
    };
    const data = transformKeys.toSnakeCase(snakeCaseArray);
    expect(data).toEqual({
      gpu_g1: 5, some_object: { object_id: 9, object_name: 'objectname1' },
    });
  });

  test('should transform lbaasG2 object to snakecase', () => {
    const snakeCaseArray = {
      lbaasG2: 5, someObject: { objectId: 9, objectName: 'objectname1' },
    };
    const data = transformKeys.toSnakeCase(snakeCaseArray);
    expect(data).toEqual({
      lbaas_g2: 5, some_object: { object_id: 9, object_name: 'objectname1' },
    });
  });

  test('should transform 2X2X20/4X4X20/6X6X20/8X8X20/8X32X20 object to snakecase', () => {
    const snakeCaseArray = {
      '2X2X20': 5,
      '4X4X20': 5,
      '6X6X20': 5,
      '8X8X20': 5,
      '8X32X20': 5,
      someObject: { objectId: 9, objectName: 'objectname1' },
    };
    const data = transformKeys.toSnakeCase(snakeCaseArray);
    expect(data).toEqual({
      '2X2X20': 5,
      '4X4X20': 5,
      '6X6X20': 5,
      '8X8X20': 5,
      '8X32X20': 5,
      some_object: { object_id: 9, object_name: 'objectname1' },
    });
  });

  test('should transform 2X2X20/4X4X20/6X6X20/8X8X20/8X32X20 object to camelcase', () => {
    const camelCaseArray = {
      '2X2X20': 5,
      '4X4X20': 5,
      '6X6X20': 5,
      '8X8X20': 5,
      '8X32X20': 5,
      some_object: { object_id: 9, object_name: 'objectname1' },
    };
    const data = transformKeys.toCamelCase(camelCaseArray);
    expect(data).toEqual({
      '2X2X20': 5,
      '4X4X20': 5,
      '6X6X20': 5,
      '8X8X20': 5,
      '8X32X20': 5,
      someObject: { objectId: 9, objectName: 'objectname1' },
    });
  });

  test('should transform lbaasG2Cpu object to snakecase', () => {
    const snakeCaseArray = {
      lbaasG2Cpu: 5, someObject: { objectId: 9, objectName: 'objectname1' },
    };
    const data = transformKeys.toSnakeCase(snakeCaseArray);
    expect(data).toEqual({
      lbaas_g2_cpu: 5, some_object: { object_id: 9, object_name: 'objectname1' },
    });
  });

  test('should transform lbaasG2Ram object to snakecase', () => {
    const snakeCaseArray = {
      lbaasG2Ram: 5, someObject: { objectId: 9, objectName: 'objectname1' },
    };
    const data = transformKeys.toSnakeCase(snakeCaseArray);
    expect(data).toEqual({
      lbaas_g2_ram: 5, some_object: { object_id: 9, object_name: 'objectname1' },
    });
  });

  test('should transform lbaasG2Ephemeral object to snakecase', () => {
    const snakeCaseArray = {
      lbaasG2Ephemeral: 5, someObject: { objectId: 9, objectName: 'objectname1' },
    };
    const data = transformKeys.toSnakeCase(snakeCaseArray);
    expect(data).toEqual({
      lbaas_g2_ephemeral: 5, some_object: { object_id: 9, object_name: 'objectname1' },
    });
  });

  test('should transform enableRoute53 object to snakecase', () => {
    const snakeCaseArray = {
      enableRoute53: true, someObject: { objectId: 9, objectName: 'objectname1' },
    };
    const data = transformKeys.toSnakeCase(snakeCaseArray);
    expect(data).toEqual({
      enable_route53: true, some_object: { object_id: 9, object_name: 'objectname1' },
    });
  });
});
