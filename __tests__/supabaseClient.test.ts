jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({ fake: true })),
}));

describe('supabaseClient', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://supabase.test';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon';
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('initializes createClient with env vars', () => {
    const { createClient } = require('@supabase/supabase-js');
    const { supabase } = require('../src/lib/supabaseClient');
    expect(createClient).toHaveBeenCalledWith(
      'http://supabase.test',
      'anon'
    );
    expect(supabase).toEqual({ fake: true });
  });

  test('throws when env vars are missing', () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    jest.resetModules();
    expect(() => require('../src/lib/supabaseClient')).toThrow(
      /Supabase environment variables missing/
    );
  });
});
